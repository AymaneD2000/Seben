<template>
  <div class="search-results">
    <div class="results-header">
      <div class="results-title-section">
        <button 
          v-if="showBackButton" 
          @click="goBackToSearch" 
          class="back-button"
          :title="t.dictionary.actions.backToSearch"
        >
          <MaterialIcon name="arrow_back" size="small" />
          {{ t.dictionary.actions.backToSearch }}
        </button>
        <h2 class="results-title">Résultats de recherche</h2>
      </div>
      <span class="results-count">{{ results.length }} résultats</span>
    </div>
    
    <div class="results-list">
      <WordDefinition 
        v-for="word in results" 
        :key="word.name"
        :word="word"
        @select-word="$emit('selectWord', $event)"
      />
    </div>
    
    <div v-if="results.length === 0" class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3 class="no-results-title">Aucun résultat trouvé</h3>
      <p class="no-results-text">
        Essayez avec des mots-clés différents ou vérifiez l'orthographe.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WordDefinition from './WordDefinition.vue'
import MaterialIcon from './MaterialIcon.vue'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'

interface WordExample {
  bambara: string
  french: string
}

interface WordData {
  name: string
  type: string
  definition: string
  examples?: WordExample[]
  relatedWords?: string[]
}

const props = defineProps<{
  results: WordData[]
  searchType?: string
}>()

const emit = defineEmits<{
  selectWord: [word: string]
  backToSearch: []
}>()

const i18nStore = useI18nStore()
const { t } = storeToRefs(i18nStore)

// Afficher le bouton de retour pour les mots populaires et tous les mots
const showBackButton = computed(() => {
  return props.searchType === 'populaires' || props.searchType === 'tous'
})

const goBackToSearch = () => {
  emit('backToSearch')
}
</script>

<style scoped>
.search-results {
  padding: 2rem 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.results-title-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  align-self: flex-start;
}

.back-button:hover {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: translateY(-1px);
}

.results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.results-count {
  font-size: 0.95rem;
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.no-results-text {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .search-results {
    padding: 1rem 0;
  }
  
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .results-title-section {
    width: 100%;
  }
  
  .back-button {
    font-size: 0.8rem;
    padding: 0.375rem 0.75rem;
  }
  
  .results-title {
    font-size: 1.25rem;
  }
  
  .results-count {
    font-size: 0.875rem;
  }
  
  .no-results {
    padding: 2rem 1rem;
  }
  
  .no-results-icon {
    font-size: 3rem;
  }
  
  .no-results-title {
    font-size: 1.25rem;
  }
  
  .no-results-text {
    font-size: 0.9rem;
  }
}
</style>
