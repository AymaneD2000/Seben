<template>
  <div class="dictionary-search">
    <div class="search-header">
      <h1 class="page-title">{{ t.dictionary.title }}</h1>
      
      <!-- Main Search Bar -->
      <div class="search-container">
        <div class="search-bar">
          <input 
            type="text" 
            :placeholder="t.dictionary.searchPlaceholder"
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
          {{ t.dictionary.actions.seeAllWords }}
        </button>
        <button class="action-btn" @click="showPopularWords">
          {{ t.dictionary.actions.popularWords }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'

const i18nStore = useI18nStore()
const { t } = storeToRefs(i18nStore)

const searchQuery = ref('')
const activeCategory = ref('tous')

const categories = computed(() => [
  { id: 'tous', name: t.value.dictionary.categories.all },
  { id: 'noms', name: t.value.dictionary.categories.nouns },
  { id: 'verbes', name: t.value.dictionary.categories.verbs },
  { id: 'adjectifs', name: t.value.dictionary.categories.adjectives },
  { id: 'expressions', name: t.value.dictionary.categories.expressions }
])

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
  padding: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.search-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
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
  padding: 1rem 2rem;
  gap: 1.5rem;
  transition: border-color 0.3s ease;
  max-width: 800px;
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
  font-size: 1.2rem;
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
  padding: 1rem 2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
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
  padding: 1rem 2rem;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
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
    padding: 2rem 1rem;
  }
  
  .page-title {
    font-size: 2.5rem;
  }
  
  .search-bar {
    padding: 0.75rem 1.5rem;
    max-width: 100%;
  }
  
  .search-input {
    font-size: 1rem;
  }
  
  .category-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .action-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
