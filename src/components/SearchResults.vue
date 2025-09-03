<template>
  <div class="search-results">
    <div class="results-header">
      <h2 class="results-title">Résultats de recherche</h2>
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
import WordDefinition from './WordDefinition.vue'

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

defineProps<{
  results: WordData[]
}>()

defineEmits<{
  selectWord: [word: string]
}>()
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
