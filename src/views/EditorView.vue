<template>
  <div class="editor-view">
    <AppHeader />
    
    <!-- Editor Toolbar -->
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
    
    <!-- Main Editor Layout -->
    <div class="editor-layout">
      <!-- Main Text Editor -->
      <main class="editor-main">
        <TextEditor 
          ref="textEditor"
          @content-changed="handleContentChanged"
          @cursor-position-changed="handleCursorPositionChanged"
        />
      </main>
      
      <!-- AI Assistant Sidebar -->
      <EditorSidebar 
        @apply-suggestion="handleApplySuggestion"
        @check-grammar="handleCheckGrammar"
        @translate-to-french="handleTranslateToFrench"
        @explain-words="handleExplainWords"
        @check-pronunciation="handleCheckPronunciation"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
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
const cursorPosition = reactive<CursorPosition>({
  line: 1,
  column: 1
})

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
  if (!textEditor.value) return
  
  const content = textEditor.value.content
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = 'document-bambara.txt'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

const handlePrintDocument = () => {
  if (!textEditor.value) return
  
  const content = textEditor.value.content
  const printWindow = window.open('', '_blank')
  
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Document Bambara</title>
          <style>
            body { font-family: Georgia, serif; line-height: 1.8; padding: 2rem; }
            h1 { color: #333; margin-bottom: 2rem; }
          </style>
        </head>
        <body>
          <h1>Document Bambara</h1>
          <pre style="white-space: pre-wrap; font-family: Georgia, serif;">${content}</pre>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}

// Text formatting
const handleToggleFormat = (format: string) => {
  if (textEditor.value) {
    textEditor.value.formatText(format)
  }
}

const handleInsertList = (type: string) => {
  if (!textEditor.value) return
  
  const listItem = type === 'ul' ? '• ' : '1. '
  textEditor.value.insertText('\n' + listItem)
}

const handleOpenSettings = () => {
  console.log('Opening settings...')
  // Settings modal would open here
}

// Content and cursor tracking
const handleContentChanged = (content: string, stats: DocumentStats) => {
  documentStats.words = stats.words
  documentStats.characters = stats.characters
  documentStats.lines = stats.lines
}

const handleCursorPositionChanged = (position: CursorPosition) => {
  cursorPosition.line = position.line
  cursorPosition.column = position.column
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
  display: flex;
  flex-direction: column;
}

.editor-layout {
  display: flex;
  flex: 1;
  height: calc(100vh - 140px); /* Account for header and toolbar */
}

.editor-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevent flex item from growing beyond container */
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .editor-layout {
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 120px);
  }
  
  .editor-main {
    min-height: 60vh;
  }
}
</style>
