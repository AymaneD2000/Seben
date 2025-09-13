<template>
  <div class="dictionary-search">
    <div class="search-header">
      <h1 class="page-title">Dictionnaire Bambara</h1>
      <p class="page-subtitle">Recherchez des mots, leurs définitions et exemples d'utilisation</p>
      
      <!-- Main Search Bar -->
      <div class="search-container">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="I be fen daw fe? (Que cherchez-vous?)"
            v-model="searchQuery"
            class="search-input"
            @keyup.enter="performSearch"
          />
          <button class="voice-button" title="Recherche vocale">
            <MaterialIcon name="mic" size="medium" />
          </button>
          <button class="search-button" @click="performSearch">
            <MaterialIcon name="search" size="medium" />
          </button>
        </div>
      </div>
      
      <!-- Category Filters -->
      <div class="category-filters">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['filter-btn', { active: activeCategory === category.id }]"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
      
      <!-- Quick Actions -->
      <div class="quick-actions">
        <button class="action-btn" @click="showAllWords">
          Voir tous les mots
        </button>
        <button class="action-btn" @click="showPopularWords">
          Mots populaires
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MaterialIcon from './MaterialIcon.vue'

const searchQuery = ref('')
const activeCategory = ref('tous')

const categories = [
  { id: 'tous', name: 'Tous' },
  { id: 'noms', name: 'Noms' },
  { id: 'verbes', name: 'Verbes' },
  { id: 'adjectifs', name: 'Adjectifs' },
  { id: 'expressions', name: 'Expressions' }
]

const emit = defineEmits<{
  search: [query: string, category: string]
}>()

const performSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value, activeCategory.value)
  }
}

const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  if (searchQuery.value.trim()) {
    performSearch()
  }
}

const showAllWords = () => {
  searchQuery.value = ''
  emit('search', '', 'tous')
}

const showPopularWords = () => {
  searchQuery.value = ''
  emit('search', '', 'populaires')
}
</script>

<style scoped>
.dictionary-search {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.search-header {
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
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.search-container {
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 3rem;
  padding: 0.75rem 1.5rem;
  gap: 1rem;
  transition: border-color 0.3s ease;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar:focus-within {
  border-color: var(--accent-primary);
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 1rem;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.voice-button,
.search-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.voice-button:hover,
.search-button:hover {
  background-color: var(--bg-tertiary);
}

.button-icon {
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
  filter: brightness(0.8);
  transition: filter 0.3s ease;
}

.voice-button:hover .button-icon,
.search-button:hover .button-icon {
  filter: brightness(1);
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.filter-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-primary);
  color: var(--text-primary);
}

.filter-btn.active {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.action-btn:hover {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dictionary-search {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .search-bar {
    padding: 0.5rem 1rem;
  }
  
  .category-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
