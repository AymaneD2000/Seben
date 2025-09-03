<template>
  <div class="dictionary-view">
    <AppHeader />
    
    <div class="dictionary-layout">
      <!-- Sidebar -->
      <DictionarySidebar @select-word="selectWord" />
      
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
            @select-word="selectWord"
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import DictionarySidebar from '@/components/DictionarySidebar.vue'
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
</script>

<style scoped>
.dictionary-view {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.dictionary-layout {
  display: flex;
  position: relative;
}

.dictionary-main {
  flex: 1;
  margin-left: 280px;
  min-height: calc(100vh - 80px);
}

.content-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dictionary-layout {
    flex-direction: column;
  }
  
  .dictionary-main {
    margin-left: 0;
  }
  
  .content-container {
    padding: 1rem;
  }
}
</style>
