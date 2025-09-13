const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const twilio = require('twilio');

const router = express.Router();

// Configuration Twilio (remplacer par vos vraies clés)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Configuration Google OAuth (remplacer par vos vraies clés)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Ici vous devriez sauvegarder l'utilisateur en base de données
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: 'google',
      verified: true
    };
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware de session
router.use(session({
  secret: process.env.SESSION_SECRET || 'seben-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Mettre à true en production avec HTTPS
}));

router.use(passport.initialize());
router.use(passport.session());

// Store temporaire pour les codes de vérification (en production, utiliser une base de données)
const verificationCodes = new Map();

// Route Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback Google OAuth
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirection vers le frontend après connexion réussie
    res.redirect('/?auth=success');
  }
);

// Envoyer un code SMS
router.post('/send-sms', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: 'Numéro de téléphone requis' });
    }

    // Générer un code à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Stocker le code temporairement (expire dans 5 minutes)
    verificationCodes.set(phone, {
      code,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Envoyer le SMS (désactivé en développement)
    if (process.env.NODE_ENV === 'production') {
      await twilioClient.messages.create({
        body: `Votre code de vérification SEBEN: ${code}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
    } else {
      // En développement, afficher le code dans la console
      console.log(`Code de vérification pour ${phone}: ${code}`);
    }

    res.json({ success: true, message: 'Code envoyé' });
  } catch (error) {
    console.error('Erreur SMS:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du SMS' });
  }
});

// Vérifier le code SMS
router.post('/verify-sms', (req, res) => {
  try {
    const { phone, code } = req.body;
    
    if (!phone || !code) {
      return res.status(400).json({ error: 'Numéro et code requis' });
    }

    const storedData = verificationCodes.get(phone);
    
    if (!storedData) {
      return res.status(400).json({ error: 'Code non trouvé ou expiré' });
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(phone);
      return res.status(400).json({ error: 'Code expiré' });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ error: 'Code incorrect' });
    }

    // Code correct, créer l'utilisateur
    const user = {
      id: `phone_${phone}`,
      name: phone,
      email: null,
      phone: phone,
      provider: 'phone',
      verified: true
    };

    // Supprimer le code utilisé
    verificationCodes.delete(phone);

    // Créer la session
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de session' });
      }
      res.json({ success: true, user });
    });
  } catch (error) {
    console.error('Erreur vérification:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification' });
  }
});

// Obtenir les informations de l'utilisateur connecté
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Non authentifié' });
  }
});

// Déconnexion
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de déconnexion' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
