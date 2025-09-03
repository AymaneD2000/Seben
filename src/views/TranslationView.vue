<template>
  <div class="translation-view">
    <AppHeader />
    
    <div class="translation-layout">
      <!-- Sidebar -->
      <TranslationSidebar 
        @options-changed="handleOptionsChange"
        @load-translation="handleLoadTranslation"
      />
      
      <!-- Main Translation Area -->
      <main class="translation-main">
        <TranslationInterface 
          ref="translationInterface"
          :options="translationOptions"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TranslationSidebar from '@/components/TranslationSidebar.vue'
import TranslationInterface from '@/components/TranslationInterface.vue'

interface TranslationOptions {
  contextual: boolean
  grammar: boolean
  pronunciation: boolean
  examples: boolean
}

interface TranslationHistory {
  id: number
  sourceLang: string
  targetLang: string
  sourceText: string
  targetText: string
  time: string
}

const translationInterface = ref()
const translationOptions = ref<TranslationOptions>({
  contextual: true,
  grammar: true,
  pronunciation: false,
  examples: false
})

const handleOptionsChange = (options: TranslationOptions) => {
  translationOptions.value = { ...options }
  console.log('Translation options updated:', options)
}

const handleLoadTranslation = (translation: TranslationHistory) => {
  console.log('Loading translation:', translation)
  
  if (translationInterface.value) {
    translationInterface.value.loadTranslation(translation)
  }
}
</script>

<style scoped>
.translation-view {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.translation-layout {
  display: flex;
  position: relative;
}

.translation-main {
  flex: 1;
  margin-left: 280px;
  min-height: calc(100vh - 80px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .translation-layout {
    flex-direction: column;
  }
  
  .translation-main {
    margin-left: 0;
  }
}
</style>
