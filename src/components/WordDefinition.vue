<template>
  <div class="word-definition">
    <div class="word-header">
      <h1 class="word-title">{{ word.name }}</h1>
      <span class="word-type">{{ word.type }}</span>
    </div>
    
    <div class="definition-section">
      <h3 class="section-title">Définition</h3>
      <p class="definition-text">{{ word.definition }}</p>
    </div>
    
    <div class="examples-section" v-if="word.examples && word.examples.length > 0">
      <h3 class="section-title">Exemples d'utilisation</h3>
      <div class="examples-list">
        <div v-for="(example, index) in word.examples" :key="index" class="example-item">
          <p class="example-bambara">{{ example.bambara }}</p>
          <p class="example-french">{{ example.french }}</p>
        </div>
      </div>
    </div>
    
    <div class="related-words-section" v-if="word.relatedWords && word.relatedWords.length > 0">
      <h3 class="section-title">Mots liés</h3>
      <div class="related-words">
        <button 
          v-for="relatedWord in word.relatedWords" 
          :key="relatedWord"
          class="related-word-btn"
          @click="$emit('selectWord', relatedWord)"
        >
          {{ relatedWord }}
        </button>
      </div>
    </div>
    
    <div class="action-buttons">
      <button class="action-btn listen-btn">
        <MaterialIcon name="volume_up" size="small" />
        Écouter
      </button>
      <button class="action-btn save-btn">
        <MaterialIcon name="save" size="small" />
        Sauvegarder
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'

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
  word: WordData
}>()

defineEmits<{
  selectWord: [word: string]
}>()
</script>

<style scoped>
.word-definition {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.word-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.word-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.word-type {
  background-color: var(--accent-primary);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.definition-section,
.examples-section,
.related-words-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.definition-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.examples-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-item {
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border-left: 4px solid var(--accent-primary);
}

.example-bambara {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-style: italic;
}

.example-french {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}

.related-words {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.related-word-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.related-word-btn:hover {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.action-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .word-definition {
    padding: 1.5rem;
  }
  
  .word-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .word-title {
    font-size: 1.75rem;
  }
  
  .section-title {
    font-size: 1.125rem;
  }
  
  .definition-text {
    font-size: 1rem;
  }
  
  .example-item {
    padding: 1rem;
  }
  
  .example-bambara {
    font-size: 1rem;
  }
  
  .example-french {
    font-size: 0.9rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    justify-content: center;
  }
}
</style>
