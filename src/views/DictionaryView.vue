<template>
  <DashboardLayout>
    <div class="dictionary-view">
      <div class="dictionary-layout">
        <!-- Main Content -->
        <main class="dictionary-main">
          <div class="content-container">
            <!-- Search Interface -->
            <DictionarySearch 
              v-if="currentView === 'search'"
              @search="performSearch"
            />
            
            <!-- Search Results -->
            <SearchResults 
              v-if="currentView === 'results'"
              :results="searchResults"
              :search-type="currentSearchType"
              @select-word="selectWord"
              @back-to-search="goBackToSearch"
            />
            
            <!-- Single Word Definition -->
            <WordDefinition 
              v-if="currentView === 'word' && selectedWordData"
              :word="selectedWordData"
              @select-word="selectWord"
            />
          </div>
        </main>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DictionarySearch from '@/components/DictionarySearch.vue'
import SearchResults from '@/components/SearchResults.vue'
import WordDefinition from '@/components/WordDefinition.vue'

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

// Sample data - in a real app, this would come from an API
const wordsDatabase: Record<string, WordData> = {
  'nege': {
    name: 'Nege',
    type: 'Nom',
    definition: 'Ferme, champ cultivé',
    examples: [
      {
        bambara: 'Nege in ka di - Le champ est bon',
        french: 'Le champ est bon'
      },
      {
        bambara: 'N be nege ke - Je cultive le champ',
        french: 'Je cultive le champ'
      }
    ],
    relatedWords: ['dugukolo', 'foroba', 'sene']
  },
  'dugukolo': {
    name: 'Dugukolo',
    type: 'Nom',
    definition: 'Terre, sol, territoire',
    examples: [
      {
        bambara: 'Dugukolo ka di - La terre est bonne',
        french: 'La terre est bonne'
      },
      {
        bambara: 'Dugukolo in be nege ye - Cette terre est un champ',
        french: 'Cette terre est un champ'
      }
    ],
    relatedWords: ['nege', 'dugu', 'kolo']
  },
  'sene': {
    name: 'Sene',
    type: 'Nom',
    definition: 'Agriculture, culture',
    examples: [
      {
        bambara: 'Sene ka nyi - L\'agriculture est bonne',
        french: 'L\'agriculture est bonne'
      }
    ],
    relatedWords: ['nege', 'dugukolo']
  },
  'foroba': {
    name: 'Foroba',
    type: 'Adjectif',
    definition: 'Public, commun',
    examples: [
      {
        bambara: 'Foroba yoro - Lieu public',
        french: 'Lieu public'
      }
    ],
    relatedWords: ['dugu']
  },
  'dugu': {
    name: 'Dugu',
    type: 'Nom',
    definition: 'Village, localité',
    examples: [
      {
        bambara: 'Dugu in ka di - Ce village est bien',
        french: 'Ce village est bien'
      }
    ],
    relatedWords: ['dugukolo', 'foroba']
  }
}

const currentView = ref<'search' | 'results' | 'word'>('search')
const selectedWord = ref('')
const searchResults = ref<WordData[]>([])
const currentSearchType = ref('')

const selectedWordData = computed(() => {
  if (selectedWord.value && wordsDatabase[selectedWord.value.toLowerCase()]) {
    return wordsDatabase[selectedWord.value.toLowerCase()]
  }
  return null
})

const selectWord = (word: string) => {
  selectedWord.value = word.toLowerCase()
  currentView.value = 'word'
}

const performSearch = (query: string, category: string) => {
  console.log('Searching for:', query, 'in category:', category)
  
  // Store the current search type
  currentSearchType.value = category
  
  // Simple search implementation - in a real app, this would be more sophisticated
  let results = Object.values(wordsDatabase)
  
  // If there's a search query, filter by it
  if (query.trim()) {
    results = results.filter(word => 
      word.name.toLowerCase().includes(query.toLowerCase()) ||
      word.definition.toLowerCase().includes(query.toLowerCase())
    )
  }
  
  // Filter by category
  if (category === 'noms') {
    results = results.filter(word => word.type.toLowerCase() === 'nom')
  } else if (category === 'adjectifs') {
    results = results.filter(word => word.type.toLowerCase() === 'adjectif')
  } else if (category === 'populaires') {
    // Show popular words - for demo, we'll show the first few words
    results = results.slice(0, 3)
  }
  // 'tous' shows all results (no additional filtering)
  
  console.log('Search results:', results.length, 'words found')
  searchResults.value = results
  currentView.value = 'results'
}

const goBackToSearch = () => {
  currentView.value = 'search'
  currentSearchType.value = ''
}
</script>

<style scoped>
.dictionary-view {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.dictionary-layout {
  display: flex;
  position: relative;
  margin-left: 280px; /* Space for AppSidebar */
}

.dictionary-main {
  flex: 1;
  min-height: 100vh;
  width: 100%;
}

.content-container {
  padding: 3rem 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Agrandir et centrer les composants du dictionnaire */
.content-container > * {
  width: 100%;
  max-width: 1400px;
  margin: 2rem 0;
}

/* Styles spécifiques pour le composant de recherche */
.content-container :deep(.dictionary-search) {
  width: 100%;
  max-width: 1200px;
  margin: 3rem 0;
}

/* Styles pour les résultats de recherche */
.content-container :deep(.search-results) {
  width: 100%;
  max-width: 1400px;
  margin: 2rem 0;
}

/* Styles pour la définition de mot */
.content-container :deep(.word-definition) {
  width: 100%;
  max-width: 1400px;
  margin: 2rem 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dictionary-layout {
    margin-left: 0;
  }
  
  .dictionary-main {
    width: 100%;
  }
  
  .content-container {
    padding: 2rem 1.5rem;
    align-items: center;
  }
  
  .content-container > * {
    max-width: 100%;
    margin: 1.5rem 0;
  }
  
  .content-container :deep(.dictionary-search) {
    margin: 2rem 0;
  }
}
</style>
