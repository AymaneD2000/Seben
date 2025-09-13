<template>
  <DashboardLayout>
    <div class="editor-view">
      <h1>Éditeur de Texte Bambara</h1>
      <p>Écrivez et éditez vos textes en bambara avec l'assistance de l'IA</p>
      
      <div class="editor-layout">
        <!-- Editor Sidebar -->
        <aside class="editor-sidebar">
          <EditorSidebar 
            @apply-suggestion="handleApplySuggestion"
            @check-grammar="handleCheckGrammar"
            @translate-to-french="handleTranslateToFrench"
            @explain-words="handleExplainWords"
            @check-pronunciation="handleCheckPronunciation"
          />
        </aside>
        
        <!-- Main Editor Area -->
        <main class="editor-main">
          <div class="content-container">
            <!-- Editor Toolbar -->
            <div class="toolbar-section">
              <h2>Barre d'outils de l'éditeur :</h2>
              <EditorToolbar 
                :word-count="documentStats.words"
                :character-count="documentStats.characters"
                :language="'Bambara'"
                @new-document="handleNewDocument"
                @download-document="handleDownloadDocument"
                @print-document="handlePrintDocument"
                @toggle-format="handleToggleFormat"
                @insert-list="handleInsertList"
                @open-settings="handleOpenSettings"
              />
            </div>
            
            <!-- Text Editor -->
            <div class="editor-section">
              <h2>Éditeur de texte :</h2>
              <TextEditor 
                ref="textEditor"
                @content-changed="handleContentChanged"
                @cursor-position-changed="handleCursorPositionChanged"
              />
            </div>
          </div>
        </main>
      </div>
      
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EditorToolbar from '@/components/EditorToolbar.vue'
import TextEditor from '@/components/TextEditor.vue'
import EditorSidebar from '@/components/EditorSidebar.vue'

interface DocumentStats {
  words: number
  characters: number
  lines: number
}

interface CursorPosition {
  line: number
  column: number
}

interface Suggestion {
  id: number
  title: string
  description: string
  original: string
  corrected: string
  type: string
}

const textEditor = ref()
const documentStats = reactive<DocumentStats>({
  words: 0,
  characters: 0,
  lines: 1
})

// Content and cursor tracking
const handleContentChanged = (content: string, stats: DocumentStats) => {
  documentStats.words = stats.words
  documentStats.characters = stats.characters
  documentStats.lines = stats.lines
}

const handleCursorPositionChanged = (position: CursorPosition) => {
  console.log('Position curseur:', position)
}

// Document operations
const handleNewDocument = () => {
  if (textEditor.value) {
    textEditor.value.content = ''
    documentStats.words = 0
    documentStats.characters = 0
    documentStats.lines = 1
  }
}

const handleDownloadDocument = () => {
  console.log('Télécharger document')
}

const handlePrintDocument = () => {
  console.log('Imprimer document')
}

const handleToggleFormat = (format: string) => {
  console.log('Format:', format)
}

const handleInsertList = (type: string) => {
  console.log('Liste:', type)
}

const handleOpenSettings = () => {
  console.log('Paramètres')
}

// AI Assistant actions
const handleApplySuggestion = (suggestion: Suggestion) => {
  if (!textEditor.value) return
  
  // Simple replacement logic - in a real app, this would be more sophisticated
  const currentContent = textEditor.value.content
  const newContent = currentContent.replace(suggestion.original, suggestion.corrected)
  textEditor.value.content = newContent
  
  console.log('Applied suggestion:', suggestion)
}

const handleCheckGrammar = () => {
  if (!textEditor.value) return
  
  console.log('Checking grammar for:', textEditor.value.content)
  // Grammar checking would happen here
  // This would analyze the text and generate suggestions
}

const handleTranslateToFrench = () => {
  if (!textEditor.value) return
  
  console.log('Translating to French:', textEditor.value.content)
  // Translation would happen here
}

const handleExplainWords = () => {
  if (!textEditor.value) return
  
  console.log('Explaining words in:', textEditor.value.content)
  // Word explanation would happen here
}

const handleCheckPronunciation = () => {
  if (!textEditor.value) return
  
  console.log('Checking pronunciation for:', textEditor.value.content)
  // Pronunciation checking would happen here
}
</script>

<style scoped>
.editor-view {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  margin-left: 280px; /* Space for AppSidebar */
}

.editor-layout {
  display: flex;
  position: relative;
  margin-left: 280px; /* Space for AppSidebar */
}

.editor-sidebar {
  width: 280px; /* Same width as AppSidebar */
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  height: 100vh;
  position: fixed;
  left: 280px; /* Position after AppSidebar */
  top: 0;
  overflow-y: auto;
  z-index: 100;
}

.editor-main {
  flex: 1;
  margin-left: 280px; /* Space for EditorSidebar */
  height: 100vh;
  width: calc(100% - 280px);
  max-width: none;
  padding-right: 0; /* Remove right padding to extend to sidebar */
}

.content-container {
  padding: 2rem 0 2rem 2rem; /* Remove right padding to extend to sidebar */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.toolbar-section {
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--card-bg);
  margin-right: 0; /* Extend to sidebar */
}

.editor-section {
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--card-bg);
  display: flex;
  flex-direction: column;
  margin-right: 0; /* Extend to sidebar */
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .editor-view {
    margin-left: 0;
  }
  
  .editor-layout {
    margin-left: 0;
    flex-direction: column;
  }
  
  .editor-sidebar {
    position: relative;
    left: 0;
    width: 100%;
    height: auto;
    max-height: 50vh;
    overflow-y: auto;
  }
  
  .editor-main {
    margin-left: 0;
    height: auto;
    width: 100%;
  }
  
  .content-container {
    padding: 1rem;
    height: auto;
  }
  
  .toolbar-section,
  .editor-section {
    margin-right: 0;
  }
}

</style>
