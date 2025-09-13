<template>
  <div v-if="isOpen" class="auth-modal-overlay" @click="closeModal">
    <div class="auth-modal" @click.stop>
      <!-- Header -->
      <div class="auth-header">
        <h2 class="auth-title">Connexion / Inscription</h2>
        <button @click="closeModal" class="close-btn">
          <MaterialIcon name="close" size="medium" />
        </button>
      </div>

      <!-- Content -->
      <div class="auth-content">
        <!-- Phone Verification Step -->
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

        <!-- Code Verification Step -->
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
              {{ authStore.isLoading ? 'Vérification...' : 'Vérifier' }}
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
            <MaterialIcon name="login" size="small" />
            Continuer avec Google
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="authStore.error" class="error-message">
          <MaterialIcon name="error" size="small" />
          {{ authStore.error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import MaterialIcon from './MaterialIcon.vue'

const authStore = useAuthStore()

// Props
const props = defineProps<{
  isOpen: boolean
}>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// Local state
const phoneInput = ref('')
const codeInput = ref('')
const countryCode = ref('+223') // Mali par défaut

// Methods
const closeModal = () => {
  emit('close')
  authStore.setError(null)
  authStore.setPhoneVerificationStep('phone')
  phoneInput.value = ''
  codeInput.value = ''
}

const handlePhoneSubmit = async () => {
  const fullPhone = countryCode.value + phoneInput.value
  await authStore.sendPhoneVerificationCode(fullPhone)
}

const handleCodeSubmit = async () => {
  await authStore.verifyPhoneCode(codeInput.value)
  if (authStore.isAuthenticated) {
    closeModal()
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
    closeModal()
  }
})
</script>

<style scoped>
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.auth-modal {
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
}

.auth-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.auth-content {
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
}

.auth-btn.google:hover:not(:disabled) {
  background-color: #3367d6;
  transform: translateY(-2px);
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .auth-modal {
    width: 95%;
    margin: 1rem;
  }
  
  .auth-header,
  .auth-content {
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
