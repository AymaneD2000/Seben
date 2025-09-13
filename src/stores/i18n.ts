import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Language {
  code: string
  name: string
  native: string
  flag: string
}

export interface Translations {
  // Navigation
  nav: {
    home: string
    dictionary: string
    assistant: string
    editor: string
    main: string
    account: string
    settings: string
    lightMode: string
    darkMode: string
  }
  
  // Header
  header: {
    myAccount: string
    login: string
    register: string
    logout: string
  }
  
  // Hero Section
  hero: {
    title: string
    subtitle: string
    searchPlaceholder: string
    stats: {
      words: string
      phrases: string
      languages: string
    }
  }
  
  // Features
  features: {
    title: string
    dictionary: {
      title: string
      description: string
    }
    assistant: {
      title: string
      description: string
    }
    editor: {
      title: string
      description: string
    }
    learning: {
      title: string
      description: string
    }
  }
  
  // Quick Access
  quickAccess: {
    title: string
    dictionary: string
    assistant: string
    editor: string
  }
  
  // Footer
  footer: {
    description: string
    functionalities: string
    modelSuite: string
    copyright: string
    links: {
      dictionary: string
      grammar: string
      assistant: string
      editor: string
      models: string
      api: string
      documentation: string
      developers: string
    }
  }
  
  // Auth
  auth: {
    login: string
    register: string
    loginTitle: string
    loginSubtitle: string
    registerTitle: string
    registerSubtitle: string
    phoneLogin: string
    phoneRegister: string
    phoneInstruction: string
    phoneInstructionRegister: string
    phoneNumber: string
    verificationCode: string
    sendCode: string
    verify: string
    resendCode: string
    createAccount: string
    continueWithGoogle: string
    alreadyHaveAccount: string
    noAccountYet: string
    firstName: string
    lastName: string
    username: string
    email: string
    personalInfo: string
    contact: string
    usernameHint: string
    phoneHint: string
  }
}

const translations: Record<string, Translations> = {
  EN: {
    nav: {
      home: 'Home',
      dictionary: 'Dictionary',
      assistant: 'Assistant',
      editor: 'Editor',
      main: 'Main',
      account: 'Account',
      settings: 'Settings',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode'
    },
    header: {
      myAccount: 'My Account',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    },
    hero: {
      title: 'Discover National Languages',
      subtitle: 'The first intelligent dictionary and grammar assistant for Mali\'s national languages',
      searchPlaceholder: 'What are you looking for?',
      stats: {
        words: 'WORDS',
        phrases: 'PHRASES',
        languages: 'LOCAL LANGUAGES'
      }
    },
    features: {
      title: 'Features',
      dictionary: {
        title: 'Intelligent Dictionary',
        description: 'Search and discover words with detailed definitions and examples'
      },
      assistant: {
        title: 'AI Assistant',
        description: 'Get help with grammar, pronunciation, and language learning'
      },
      editor: {
        title: 'Text Editor',
        description: 'Write and edit documents with AI assistance'
      },
      learning: {
        title: 'Learning Resources',
        description: 'Educational content to master national languages'
      }
    },
    quickAccess: {
      title: 'Quick Access',
      dictionary: 'Dictionary',
      assistant: 'Assistant',
      editor: 'Editor'
    },
    footer: {
      description: 'The intelligent dictionary of the Bambara language',
      functionalities: 'Features',
      modelSuite: 'Model Suite',
      copyright: '© 2025 RobotsMaliAI4D Lab. All rights reserved.',
      links: {
        dictionary: 'Dictionary',
        grammar: 'Grammar',
        assistant: 'AI Assistant',
        editor: 'Text Editor',
        models: 'AI Models',
        api: 'API',
        documentation: 'Documentation',
        developers: 'Developers'
      }
    },
    auth: {
      login: 'Login',
      register: 'Register',
      loginTitle: 'Login',
      loginSubtitle: 'Log in to your SEBEN account',
      registerTitle: 'Create Account',
      registerSubtitle: 'Join the SEBEN community',
      phoneLogin: 'Phone Login',
      phoneRegister: 'Phone Registration',
      phoneInstruction: 'Enter your phone number to receive a verification code',
      phoneInstructionRegister: 'Fill in your information to join SEBEN',
      phoneNumber: 'Phone Number',
      verificationCode: 'Verification Code',
      sendCode: 'Send Code',
      verify: 'Verify',
      resendCode: 'Resend Code',
      createAccount: 'Create Account',
      continueWithGoogle: 'Continue with Google',
      alreadyHaveAccount: 'Already have an account?',
      noAccountYet: 'No account yet?',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email Address',
      personalInfo: 'Personal Information',
      contact: 'Contact',
      usernameHint: 'This name will be visible to other users',
      phoneHint: 'We will send you a verification code'
    }
  },
  
  FR: {
    nav: {
      home: 'Accueil',
      dictionary: 'Dictionnaire',
      assistant: 'Assistant',
      editor: 'Éditeur',
      main: 'Principal',
      account: 'Compte',
      settings: 'Paramètres',
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre'
    },
    header: {
      myAccount: 'Mon compte',
      login: 'Connexion',
      register: 'Inscription',
      logout: 'Déconnexion'
    },
    hero: {
      title: 'Découvrez les langues nationales',
      subtitle: 'Le premier dictionnaire intelligent et assistant de grammaire pour les langues nationales du Mali',
      searchPlaceholder: 'Que cherchez-vous?',
      stats: {
        words: 'MOTS',
        phrases: 'PHRASES',
        languages: 'LANGUES LOCALES'
      }
    },
    features: {
      title: 'Fonctionnalités',
      dictionary: {
        title: 'Dictionnaire Intelligent',
        description: 'Recherchez et découvrez les mots avec des définitions détaillées et des exemples'
      },
      assistant: {
        title: 'Assistant IA',
        description: 'Obtenez de l\'aide pour la grammaire, la prononciation et l\'apprentissage des langues'
      },
      editor: {
        title: 'Éditeur de Texte',
        description: 'Rédigez et éditez des documents avec l\'assistance de l\'IA'
      },
      learning: {
        title: 'Ressources d\'Apprentissage',
        description: 'Contenu éducatif pour maîtriser les langues nationales'
      }
    },
    quickAccess: {
      title: 'Accès Rapide',
      dictionary: 'Dictionnaire',
      assistant: 'Assistant',
      editor: 'Éditeur'
    },
    footer: {
      description: 'Le dictionnaire intelligent de la langue bambara',
      functionalities: 'Fonctionnalités',
      modelSuite: 'Model Suite',
      copyright: '© 2025 RobotsMaliAI4D Lab. Tous droits réservés.',
      links: {
        dictionary: 'Dictionnaire',
        grammar: 'Grammaire',
        assistant: 'Assistant IA',
        editor: 'Éditeur de texte',
        models: 'Modèles IA',
        api: 'API',
        documentation: 'Documentation',
        developers: 'Développeurs'
      }
    },
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      loginTitle: 'Connexion',
      loginSubtitle: 'Connectez-vous à votre compte SEBEN',
      registerTitle: 'Créer un compte',
      registerSubtitle: 'Rejoignez la communauté SEBEN',
      phoneLogin: 'Connexion par téléphone',
      phoneRegister: 'Inscription par téléphone',
      phoneInstruction: 'Entrez votre numéro de téléphone pour recevoir un code de vérification',
      phoneInstructionRegister: 'Remplissez vos informations pour rejoindre SEBEN',
      phoneNumber: 'Numéro de téléphone',
      verificationCode: 'Code de vérification',
      sendCode: 'Envoyer le code',
      verify: 'Vérifier',
      resendCode: 'Renvoyer le code',
      createAccount: 'Créer mon compte',
      continueWithGoogle: 'Continuer avec Google',
      alreadyHaveAccount: 'Déjà un compte ?',
      noAccountYet: 'Pas encore de compte ?',
      firstName: 'Prénom',
      lastName: 'Nom',
      username: 'Nom d\'utilisateur',
      email: 'Adresse email',
      personalInfo: 'Informations personnelles',
      contact: 'Contact',
      usernameHint: 'Ce nom sera visible par les autres utilisateurs',
      phoneHint: 'Nous vous enverrons un code de vérification'
    }
  },
  
  BM: {
    nav: {
      home: 'Kɔrɔlen',
      dictionary: 'Daɲɛgafe',
      assistant: 'Dɛmɛnikɛla',
      editor: 'Sɛbɛnnikɛla',
      main: 'Kɛnɛ',
      account: 'Konto',
      settings: 'Kɛnɛyaw',
      lightMode: 'Kɔrɔlen mode',
      darkMode: 'Dibi mode'
    },
    header: {
      myAccount: 'N ka konto',
      login: 'Donni',
      register: 'Tɔgɔ sɛbɛn',
      logout: 'Bɔra'
    },
    hero: {
      title: 'Kanw dɔnni',
      subtitle: 'Daɲɛgafe kɔrɔlen ani dɛmɛnikɛla Mali kanw ma',
      searchPlaceholder: 'Mun b\'a fɛ?',
      stats: {
        words: 'KANW',
        phrases: 'KANW JUKO',
        languages: 'KANW TIGIW'
      }
    },
    features: {
      title: 'Kɛnɛyaw',
      dictionary: {
        title: 'Daɲɛgafe Kɔrɔlen',
        description: 'Kanw cɛ ani dɔnni ni kumaɲɔgɔnw ani misaliw'
      },
      assistant: {
        title: 'Dɛmɛnikɛla',
        description: 'Sɛbɛnni kanw kalan ni dɔnni ma'
      },
      editor: {
        title: 'Sɛbɛnnikɛla',
        description: 'Sɛbɛnni ani labɛnni ni dɛmɛnikɛla ye'
      },
      learning: {
        title: 'Kalan Kɛnɛyaw',
        description: 'Kalan kɛnɛyaw kanw dɔnni ma'
      }
    },
    quickAccess: {
      title: 'Sɔrɔli Cɛma',
      dictionary: 'Daɲɛgafe',
      assistant: 'Dɛmɛnikɛla',
      editor: 'Sɛbɛnnikɛla'
    },
    footer: {
      description: 'Bambara kan daɲɛgafe kɔrɔlen',
      functionalities: 'Kɛnɛyaw',
      modelSuite: 'Model Suite',
      copyright: '© 2025 RobotsMaliAI4D Lab. Hakɛ bɛɛ hakɛ.',
      links: {
        dictionary: 'Daɲɛgafe',
        grammar: 'Kan kalan',
        assistant: 'Dɛmɛnikɛla',
        editor: 'Sɛbɛnnikɛla',
        models: 'Dɛmɛnikɛlaw',
        api: 'API',
        documentation: 'Sɛbɛnni',
        developers: 'Sɛbɛnnikɛlaw'
      }
    },
    auth: {
      login: 'Donni',
      register: 'Tɔgɔ sɛbɛn',
      loginTitle: 'Donni',
      loginSubtitle: 'Donni i ka SEBEN konto la',
      registerTitle: 'Konto kɛ',
      registerSubtitle: 'SEBEN jama la',
      phoneLogin: 'Telefɔni donni',
      phoneRegister: 'Telefɔni tɔgɔ sɛbɛn',
      phoneInstruction: 'I ka telefɔni nimɔrɔ kɛ ka kɔdɛ sɔrɔ',
      phoneInstructionRegister: 'I ka kunnafoniw kɛ ka SEBEN la',
      phoneNumber: 'Telefɔni nimɔrɔ',
      verificationCode: 'Kɔdɛ',
      sendCode: 'Kɔdɛ ci',
      verify: 'Jira',
      resendCode: 'Kɔdɛ ci kura',
      createAccount: 'N ka konto kɛ',
      continueWithGoogle: 'Google ye taa',
      alreadyHaveAccount: 'Konto b\'a la?',
      noAccountYet: 'Konto tɛ foyi?',
      firstName: 'Tɔgɔ',
      lastName: 'Jamu',
      username: 'Baarakɛla tɔgɔ',
      email: 'Email',
      personalInfo: 'Mɔgɔ kunnafoniw',
      contact: 'Kan',
      usernameHint: 'Nin tɔgɔ bɛna ye mɔgɔ wɛrɛw ma',
      phoneHint: 'An bɛna kɔdɛ ci i ma'
    }
  }
}

export const useI18nStore = defineStore('i18n', () => {
  const currentLanguage = ref<Language>({
    code: 'EN',
    name: 'English',
    native: 'English',
    flag: '🇺🇸'
  })

  const languages = ref<Language[]>([
    { code: 'EN', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'FR', name: 'Français', native: 'Français', flag: '🇫🇷' },
    { code: 'BM', name: 'Bambara', native: 'Bamanankan', flag: '🇲🇱' }
  ])

  const t = computed(() => translations[currentLanguage.value.code])

  const setLanguage = (language: Language) => {
    currentLanguage.value = language
    localStorage.setItem('seben-language', JSON.stringify(language))
  }

  const loadLanguage = () => {
    const saved = localStorage.getItem('seben-language')
    if (saved) {
      try {
        const lang = JSON.parse(saved)
        const found = languages.value.find(l => l.code === lang.code)
        if (found) {
          currentLanguage.value = found
        }
      } catch (e) {
        console.error('Error loading saved language:', e)
      }
    }
  }

  return {
    currentLanguage,
    languages,
    t,
    setLanguage,
    loadLanguage
  }
})
