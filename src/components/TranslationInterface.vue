<template>
  <div class="translation-interface">
    <!-- Header -->
    <div class="translation-header">
      <h1 class="page-title">Traduction Multilingue</h1>
      <p class="page-subtitle">Traduisez entre le bambara et les langues locales du Mali</p>
    </div>

    <!-- Language Selection -->
    <div class="language-selector">
      <div class="language-group">
        <label class="language-label">Langue source</label>
        <select v-model="sourceLanguage" class="language-select">
          <option value="francais">Français</option>
          <option value="bambara">Bambara</option>
          <option value="peul">Peul</option>
          <option value="dogon">Dogon</option>
          <option value="sonrai">Sonraï</option>
        </select>
      </div>
      
      <button @click="swapLanguages" class="swap-button" title="Inverser les langues">
        🔄
      </button>
      
      <div class="language-group">
        <label class="language-label">Langue cible</label>
        <select v-model="targetLanguage" class="language-select">
          <option value="bambara">Bambara</option>
          <option value="francais">Français</option>
          <option value="peul">Peul</option>
          <option value="dogon">Dogon</option>
          <option value="sonrai">Sonraï</option>
        </select>
      </div>
    </div>

    <!-- Translation Areas -->
    <div class="translation-areas">
      <!-- Source Text Area -->
      <div class="text-area-container">
        <div class="text-area-header">
          <h3 class="area-title">Texte à traduire</h3>
          <div class="area-actions">
            <button class="action-btn" title="Plus d'options">⋯</button>
            <button class="action-btn" title="Effacer">🗑️</button>
          </div>
        </div>
        <div class="text-area-wrapper">
          <textarea
            v-model="sourceText"
            @input="handleSourceInput"
            placeholder="I ni sogoma, i ka kene ?"
            class="text-area source-area"
            rows="8"
          ></textarea>
          <div class="text-area-footer">
            <button class="footer-btn" title="Enregistrement vocal">
              <img src="@/assets/microphone_icon.png" alt="Microphone" class="footer-icon" />
            </button>
            <span class="character-count">{{ sourceText.length }} caractères</span>
          </div>
        </div>
      </div>

      <!-- Target Text Area -->
      <div class="text-area-container">
        <div class="text-area-header">
          <h3 class="area-title">Traduction</h3>
          <div class="area-actions">
            <button class="action-btn" title="Copier">📋</button>
            <button class="action-btn" title="Plus d'options">⋯</button>
          </div>
        </div>
        <div class="text-area-wrapper">
          <div class="text-area target-area">
            <div v-if="!translatedText && !isTranslating" class="placeholder-text">
              La traduction apparaîtra ici...
            </div>
            <div v-if="isTranslating" class="translating-indicator">
              <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Traduction en cours...</span>
            </div>
            <div v-if="translatedText && !isTranslating" class="translation-result">
              <div class="translated-text">{{ translatedText }}</div>
              
              <!-- Pronunciation -->
              <div v-if="pronunciation && options.pronunciation" class="pronunciation-section">
                <h4 class="section-subtitle">Prononciation :</h4>
                <div class="pronunciation-text">{{ pronunciation }}</div>
              </div>
              
              <!-- Literal Translation -->
              <div v-if="literalTranslation" class="literal-section">
                <h4 class="section-subtitle">Littéralement :</h4>
                <div class="literal-text">"{{ literalTranslation }}"</div>
              </div>
            </div>
          </div>
          <div class="text-area-footer">
            <div class="confidence-indicator" v-if="confidence">
              <span class="confidence-label">Confiance :</span>
              <div class="confidence-bar">
                <div class="confidence-fill" :style="{ width: confidence + '%' }"></div>
              </div>
              <span class="confidence-value">{{ confidence }}%</span>
            </div>
            <span class="word-count" v-if="translatedText">{{ wordCount }} mots</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const sourceLanguage = ref('francais')
const targetLanguage = ref('bambara')
const sourceText = ref('')
const translatedText = ref('')
const isTranslating = ref(false)
const pronunciation = ref('')
const literalTranslation = ref('')
const confidence = ref(0)

const props = defineProps<{
  options: {
    contextual: boolean
    grammar: boolean
    pronunciation: boolean
    examples: boolean
  }
}>()

const wordCount = computed(() => {
  return translatedText.value.trim().split(/\s+/).filter(word => word.length > 0).length
})

const swapLanguages = () => {
  const temp = sourceLanguage.value
  sourceLanguage.value = targetLanguage.value
  targetLanguage.value = temp
  
  // Also swap the texts
  const tempText = sourceText.value
  sourceText.value = translatedText.value
  translatedText.value = tempText
}

const handleSourceInput = async () => {
  if (!sourceText.value.trim()) {
    translatedText.value = ''
    pronunciation.value = ''
    literalTranslation.value = ''
    confidence.value = 0
    return
  }
  
  // Debounce the translation
  clearTimeout(translationTimeout)
  translationTimeout = setTimeout(() => {
    performTranslation()
  }, 1000)
}

let translationTimeout: NodeJS.Timeout

const performTranslation = async () => {
  if (!sourceText.value.trim()) return
  
  isTranslating.value = true
  
  // Simulate translation API call
  setTimeout(() => {
    const translation = getTranslation(sourceText.value, sourceLanguage.value, targetLanguage.value)
    translatedText.value = translation.text
    pronunciation.value = translation.pronunciation
    literalTranslation.value = translation.literal
    confidence.value = translation.confidence
    isTranslating.value = false
  }, 1500)
}

const getTranslation = (text: string, from: string, to: string) => {
  // Simple mock translation logic
  const translations: Record<string, any> = {
    'i ni sogoma, i ka kene ?': {
      text: 'I ni sogoma, i ka kene ?',
      pronunciation: 'I ni so-ga-ma, i ka ke-ne',
      literal: 'Toi et matin, toi comment va ?',
      confidence: 95
    },
    'bonjour, comment allez-vous ?': {
      text: 'I ni sogoma, i ka kene ?',
      pronunciation: 'I ni so-ga-ma, i ka ke-ne',
      literal: 'Toi et matin, toi comment va ?',
      confidence: 95
    },
    'merci beaucoup': {
      text: 'I ni ce kosɛbɛ',
      pronunciation: 'I ni ce ko-se-be',
      literal: 'Toi et merci beaucoup',
      confidence: 98
    },
    'je vais bien': {
      text: 'N ka kene',
      pronunciation: 'N ka ke-ne',
      literal: 'Je suis bien',
      confidence: 92
    }
  }
  
  const key = text.toLowerCase().trim()
  return translations[key] || {
    text: 'Traduction non disponible pour ce texte',
    pronunciation: '',
    literal: '',
    confidence: 50
  }
}

// Load translation from sidebar
const loadTranslation = (translation: any) => {
  sourceLanguage.value = translation.sourceLang.toLowerCase()
  targetLanguage.value = translation.targetLang.toLowerCase()
  sourceText.value = translation.sourceText
  translatedText.value = translation.targetText
  confidence.value = 95
}

defineExpose({
  loadTranslation
})
</script>

<style scoped>
.translation-interface {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.translation-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.language-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.language-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.language-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.language-select {
  padding: 0.75rem 1.5rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  text-align: center;
}

.language-select:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.swap-button {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.swap-button:hover {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  transform: rotate(180deg);
}

.translation-areas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.text-area-container {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  overflow: hidden;
}

.text-area-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.area-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.area-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: var(--bg-tertiary);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background-color: var(--accent-primary);
}

.text-area-wrapper {
  position: relative;
}

.text-area {
  width: 100%;
  min-height: 200px;
  padding: 1.5rem;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  font-family: inherit;
}

.text-area::placeholder {
  color: var(--text-muted);
}

.target-area {
  min-height: 200px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.placeholder-text {
  color: var(--text-muted);
  font-style: italic;
}

.translating-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
}

.loading-dots {
  display: flex;
  gap: 0.25rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background-color: var(--accent-primary);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.translation-result {
  flex: 1;
}

.translated-text {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.pronunciation-section,
.literal-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.section-subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.pronunciation-text {
  font-family: 'Courier New', monospace;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.95rem;
}

.literal-text {
  color: var(--text-secondary);
  font-style: italic;
  font-size: 0.95rem;
}

.text-area-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.footer-btn:hover {
  background-color: var(--bg-tertiary);
}

.footer-icon {
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
}

.character-count,
.word-count {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.confidence-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.confidence-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.confidence-bar {
  width: 60px;
  height: 6px;
  background-color: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background-color: var(--accent-primary);
  transition: width 0.3s ease;
}

.confidence-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .translation-interface {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .language-selector {
    flex-direction: column;
    gap: 1rem;
  }
  
  .language-select {
    min-width: 200px;
  }
  
  .translation-areas {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .text-area-header {
    padding: 0.75rem 1rem;
  }
  
  .area-title {
    font-size: 1rem;
  }
  
  .text-area {
    padding: 1rem;
    min-height: 150px;
  }
  
  .text-area-footer {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .confidence-indicator {
    order: -1;
  }
}
</style>
