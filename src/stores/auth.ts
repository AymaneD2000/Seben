import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  avatar?: string
  provider: 'google' | 'phone'
  verified: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const phoneVerificationStep = ref<'phone' | 'code' | 'complete'>('phone')
  const verificationCode = ref('')
  const phoneNumber = ref('')

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isPhoneVerification = computed(() => phoneVerificationStep.value !== 'complete')

  // Actions
  const setUser = (userData: User) => {
    user.value = userData
    error.value = null
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const logout = () => {
    user.value = null
    phoneVerificationStep.value = 'phone'
    verificationCode.value = ''
    phoneNumber.value = ''
    error.value = null
  }

  const setPhoneVerificationStep = (step: 'phone' | 'code' | 'complete') => {
    phoneVerificationStep.value = step
  }

  const setVerificationCode = (code: string) => {
    verificationCode.value = code
  }

  const setPhoneNumber = (phone: string) => {
    phoneNumber.value = phone
  }

  // Google OAuth
  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Redirection vers Google OAuth
      window.location.href = '/api/auth/google'
    } catch (err) {
      setError('Erreur lors de la connexion avec Google')
      console.error('Google OAuth error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Phone authentication
  const sendPhoneVerificationCode = async (phone: string, userData?: any) => {
    try {
      setLoading(true)
      setError(null)
      setPhoneNumber(phone)

      const response = await fetch('/api/auth/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, userData }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du code')
      }

      setPhoneVerificationStep('code')
    } catch (err) {
      setError('Erreur lors de l\'envoi du code de vérification')
      console.error('SMS error:', err)
    } finally {
      setLoading(false)
    }
  }

  const verifyPhoneCode = async (code: string) => {
    try {
      setLoading(true)
      setError(null)
      setVerificationCode(code)

      const response = await fetch('/api/auth/verify-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: phoneNumber.value, 
          code 
        }),
      })

      if (!response.ok) {
        throw new Error('Code de vérification invalide')
      }

      const userData = await response.json()
      setUser(userData.user)
      setPhoneVerificationStep('complete')
    } catch (err) {
      setError('Code de vérification invalide')
      console.error('Verification error:', err)
    } finally {
      setLoading(false)
    }
  }

  const resendVerificationCode = async () => {
    if (phoneNumber.value) {
      await sendPhoneVerificationCode(phoneNumber.value)
    }
  }

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/me')
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (err) {
      console.error('Auth check error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    // State
    user,
    isLoading,
    error,
    phoneVerificationStep,
    verificationCode,
    phoneNumber,
    
    // Getters
    isAuthenticated,
    isPhoneVerification,
    
    // Actions
    setUser,
    setLoading,
    setError,
    logout,
    setPhoneVerificationStep,
    setVerificationCode,
    setPhoneNumber,
    loginWithGoogle,
    sendPhoneVerificationCode,
    verifyPhoneCode,
    resendVerificationCode,
    checkAuthStatus,
  }
})
