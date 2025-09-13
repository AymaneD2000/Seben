<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Header -->
      <div class="login-header">
        <RouterLink to="/" class="logo-link">
          <AppLogo size="large" />
        </RouterLink>
        <h1 class="login-title">Connexion</h1>
        <p class="login-subtitle">Connectez-vous à votre compte SEBEN</p>
      </div>

      <!-- Login Form -->
      <div class="login-form-container">
        <!-- Phone Authentication -->
        <div v-if="authStore.phoneVerificationStep === 'phone'" class="auth-step">
          <div class="step-header">
            <MaterialIcon name="phone" size="large" color="var(--accent-primary)" />
            <h3>Connexion par téléphone</h3>
            <p>Entrez votre numéro de téléphone pour recevoir un code de vérification</p>
          </div>

          <form @submit.prevent="handlePhoneSubmit" class="auth-form">
            <div class="input-group">
              <label for="phone">Numéro de téléphone</label>
              <div class="phone-input-container">
                <select v-model="countryCode" class="country-select">
                  <option value="+223">🇲🇱 +223</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  id="phone"
                  v-model="phoneInput"
                  type="tel"
                  placeholder="12345678"
                  class="phone-input"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              class="auth-btn primary"
              :disabled="authStore.isLoading"
            >
              <MaterialIcon v-if="authStore.isLoading" name="hourglass_empty" size="small" />
              <MaterialIcon v-else name="send" size="small" />
              {{ authStore.isLoading ? 'Envoi...' : 'Envoyer le code' }}
            </button>
          </form>
        </div>

        <!-- Code Verification -->
        <div v-if="authStore.phoneVerificationStep === 'code'" class="auth-step">
          <div class="step-header">
            <MaterialIcon name="sms" size="large" color="var(--accent-primary)" />
            <h3>Vérification du code</h3>
            <p>Entrez le code à 6 chiffres envoyé au {{ authStore.phoneNumber }}</p>
          </div>

          <form @submit.prevent="handleCodeSubmit" class="auth-form">
            <div class="input-group">
              <label for="code">Code de vérification</label>
              <input
                id="code"
                v-model="codeInput"
                type="text"
                placeholder="123456"
                class="code-input"
                maxlength="6"
                required
              />
            </div>

            <button 
              type="submit" 
              class="auth-btn primary"
              :disabled="authStore.isLoading"
            >
              <MaterialIcon v-if="authStore.isLoading" name="hourglass_empty" size="small" />
              <MaterialIcon v-else name="check" size="small" />
              {{ authStore.isLoading ? 'Vérification...' : 'Se connecter' }}
            </button>

            <button 
              type="button" 
              class="auth-btn secondary"
              @click="resendCode"
              :disabled="authStore.isLoading"
            >
              <MaterialIcon name="refresh" size="small" />
              Renvoyer le code
            </button>
          </form>
        </div>

        <!-- Divider -->
        <div class="auth-divider">
          <span>ou</span>
        </div>

        <!-- Google OAuth -->
        <div class="google-auth">
          <button 
            @click="handleGoogleLogin"
            class="auth-btn google"
            :disabled="authStore.isLoading"
          >
            <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="authStore.error" class="error-message">
          <MaterialIcon name="error" size="small" />
          {{ authStore.error }}
        </div>

        <!-- Footer -->
        <div class="login-footer">
          <p>Pas encore de compte ? <RouterLink to="/register" class="link">Créer un compte</RouterLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/AppLogo.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

const router = useRouter()
const authStore = useAuthStore()

// Local state
const phoneInput = ref('')
const codeInput = ref('')
const countryCode = ref('+223') // Mali par défaut

// Methods
const handlePhoneSubmit = async () => {
  const fullPhone = countryCode.value + phoneInput.value
  await authStore.sendPhoneVerificationCode(fullPhone)
}

const handleCodeSubmit = async () => {
  await authStore.verifyPhoneCode(codeInput.value)
  if (authStore.isAuthenticated) {
    router.push('/')
  }
}

const handleGoogleLogin = async () => {
  await authStore.loginWithGoogle()
}

const resendCode = async () => {
  await authStore.resendVerificationCode()
}

// Watch for authentication success
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth) {
    router.push('/')
  }
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 2rem;
}

.login-container {
  background-color: var(--card-bg);
  border-radius: 1.5rem;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 480px;
  overflow: hidden;
}

.login-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 1.5rem 0 0.5rem 0;
}

.login-subtitle {
  color: var(--text-secondary);
  margin: 0;
}

.logo-link {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.login-form-container {
  padding: 2rem;
}

.auth-step {
  margin-bottom: 2rem;
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1rem 0 0.5rem 0;
}

.step-header p {
  color: var(--text-secondary);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 500;
  color: var(--text-primary);
}

.phone-input-container {
  display: flex;
  gap: 0.5rem;
}

.country-select {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  min-width: 120px;
}

.phone-input,
.code-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.phone-input:focus,
.code-input:focus,
.country-select:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.code-input {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  font-weight: 600;
}

.auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.auth-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-btn.primary {
  background-color: var(--accent-primary);
  color: white;
}

.auth-btn.primary:hover:not(:disabled) {
  background-color: var(--accent-secondary);
  transform: translateY(-2px);
}

.auth-btn.secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.auth-btn.secondary:hover:not(:disabled) {
  background-color: var(--bg-secondary);
}

.auth-btn.google {
  background-color: #4285f4;
  color: white;
  width: 100%;
  border: 1px solid #4285f4;
}

.auth-btn.google:hover:not(:disabled) {
  background-color: #3367d6;
  border-color: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 133, 244, 0.3);
}

.google-icon {
  margin-right: 0.5rem;
}

.auth-divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: var(--text-muted);
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--border-color);
}

.auth-divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
}

.google-auth {
  margin-top: 1rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 0.5rem;
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.login-footer p {
  color: var(--text-secondary);
  margin: 0;
}

.link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }
  
  .login-header {
    padding: 2rem 1.5rem 1.5rem;
  }
  
  .login-form-container {
    padding: 1.5rem;
  }
  
  .phone-input-container {
    flex-direction: column;
  }
  
  .country-select {
    min-width: auto;
  }
}
</style>
