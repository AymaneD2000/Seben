<template>
  <aside class="translation-sidebar">
    <!-- Translation Options -->
    <div class="sidebar-section">
      <h3 class="section-title">Options de traduction</h3>
      
      <div class="option-item">
        <div class="option-header">
          <span class="option-icon">🎯</span>
          <div class="option-info">
            <h4 class="option-title">Traduction contextuelle</h4>
            <p class="option-description">Traduction intelligente qui tient compte du contexte</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="options.contextual" />
          <span class="slider"></span>
        </label>
      </div>
      
      <div class="option-item">
        <div class="option-header">
          <span class="option-icon">📖</span>
          <div class="option-info">
            <h4 class="option-title">Grammaire adaptée</h4>
            <p class="option-description">Adaptation automatique de la grammaire</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="options.grammar" />
          <span class="slider"></span>
        </label>
      </div>
      
      <div class="option-item">
        <div class="option-header">
          <span class="option-icon">🔊</span>
          <div class="option-info">
            <h4 class="option-title">Prononciation</h4>
            <p class="option-description">Inclure la prononciation phonétique</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="options.pronunciation" />
          <span class="slider"></span>
        </label>
      </div>
      
      <div class="option-item">
        <div class="option-header">
          <span class="option-icon">📝</span>
          <div class="option-info">
            <h4 class="option-title">Exemples</h4>
            <p class="option-description">Afficher des exemples d'utilisation</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="options.examples" />
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <!-- Recent Translations -->
    <div class="sidebar-section">
      <h3 class="section-title">Traductions récentes</h3>
      
      <div class="translation-history">
        <div 
          v-for="translation in recentTranslations" 
          :key="translation.id"
          class="history-item"
          @click="loadTranslation(translation)"
        >
          <div class="translation-pair">
            <div class="source-lang">{{ translation.sourceLang }}</div>
            <span class="arrow">→</span>
            <div class="target-lang">{{ translation.targetLang }}</div>
          </div>
          <div class="translation-preview">
            <div class="source-text">{{ translation.sourceText }}</div>
            <div class="target-text">{{ translation.targetText }}</div>
          </div>
          <div class="translation-time">{{ translation.time }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TranslationHistory {
  id: number
  sourceLang: string
  targetLang: string
  sourceText: string
  targetText: string
  time: string
}

const options = ref({
  contextual: true,
  grammar: true,
  pronunciation: false,
  examples: false
})

const recentTranslations = ref<TranslationHistory[]>([
  {
    id: 1,
    sourceLang: 'Français',
    targetLang: 'Bambara',
    sourceText: 'Merci beaucoup',
    targetText: 'I ni ce',
    time: 'Il y a 2h'
  },
  {
    id: 2,
    sourceLang: 'Bambara',
    targetLang: 'Français',
    sourceText: 'N be bora',
    targetText: 'Je vais',
    time: 'Il y a 4h'
  },
  {
    id: 3,
    sourceLang: 'Français',
    targetLang: 'Bambara',
    sourceText: 'Salaam aleykum',
    targetText: 'Salaam aleykum',
    time: 'Il y a 1j'
  }
])

const emit = defineEmits<{
  optionsChanged: [options: typeof options.value]
  loadTranslation: [translation: TranslationHistory]
}>()

const loadTranslation = (translation: TranslationHistory) => {
  emit('loadTranslation', translation)
}

// Watch for options changes
import { watch } from 'vue'
watch(options, (newOptions) => {
  emit('optionsChanged', newOptions)
}, { deep: true })
</script>

<style scoped>
.translation-sidebar {
  width: 280px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  padding: 2rem 1.5rem;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
}

.sidebar-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.option-item:hover {
  border-color: var(--accent-primary);
}

.option-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.option-icon {
  font-size: 1.2rem;
  margin-top: 0.125rem;
}

.option-info {
  flex: 1;
}

.option-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.option-description {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  margin-left: 1rem;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-tertiary);
  transition: 0.3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--accent-primary);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.translation-history {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-item:hover {
  border-color: var(--accent-primary);
  transform: translateX(4px);
}

.translation-pair {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.source-lang,
.target-lang {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  background-color: var(--bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.arrow {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.translation-preview {
  margin-bottom: 0.75rem;
}

.source-text {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.target-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-style: italic;
}

.translation-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: right;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .translation-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
  }
  
  .sidebar-section {
    margin-bottom: 2rem;
  }
  
  .option-item {
    padding: 0.75rem;
  }
  
  .option-header {
    gap: 0.5rem;
  }
  
  .option-title {
    font-size: 0.9rem;
  }
  
  .option-description {
    font-size: 0.75rem;
  }
  
  .toggle-switch {
    width: 40px;
    height: 22px;
    margin-left: 0.5rem;
  }
  
  .slider:before {
    height: 16px;
    width: 16px;
  }
  
  input:checked + .slider:before {
    transform: translateX(18px);
  }
  
  .history-item {
    padding: 0.75rem;
  }
}
</style>
