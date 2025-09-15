<template>
  <DashboardLayout>
    <div class="editor-view">
      <div class="editor-layout">
        <!-- Main Editor Area -->
        <main class="editor-main">
          <div class="content-container">
            <!-- Editor Toolbar -->
            <div class="toolbar-section">
              <EditorToolbar 
                :word-count="documentStats.words"
                :character-count="documentStats.characters"
                :language="'Bambara'"
                @new-document="handleNewDocument"
                @new-page="handleNewPage"
                @download-document="handleDownloadDocument"
                @print-document="handlePrintDocument"
                @undo="handleUndo"
                @redo="handleRedo"
                @toggle-format="handleToggleFormat"
                @change-font-family="handleChangeFontFamily"
                @change-font-size="handleChangeFontSize"
                @open-color-picker="handleOpenColorPicker"
                @insert-list="handleInsertList"
                @open-settings="handleOpenSettings"
              />
            </div>
            
            <!-- Text Editor -->
            <div class="editor-section">
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

interface DocumentStats {
  words: number
  characters: number
  lines: number
}

interface CursorPosition {
  line: number
  column: number
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
  if (textEditor.value) {
    textEditor.value.formatText(format)
  }
}

const handleInsertList = (type: string) => {
  if (textEditor.value) {
    textEditor.value.insertList(type)
  }
}

const handleOpenSettings = () => {
  console.log('Paramètres')
}

const handleChangeFontFamily = (fontFamily: string) => {
  if (textEditor.value) {
    textEditor.value.changeFontFamily(fontFamily)
  }
}

const handleChangeFontSize = (fontSize: string) => {
  if (textEditor.value) {
    textEditor.value.changeFontSize(fontSize)
  }
}

const handleOpenColorPicker = (type: string) => {
  if (textEditor.value) {
    textEditor.value.openColorPicker(type)
  }
}

const handleUndo = () => {
  if (textEditor.value) {
    textEditor.value.undo()
  }
}

const handleRedo = () => {
  if (textEditor.value) {
    textEditor.value.redo()
  }
}

const handleNewPage = () => {
  if (textEditor.value) {
    textEditor.value.newPage()
  }
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
}

.editor-main {
  flex: 1;
  height: 100vh;
  width: 100%;
  max-width: none;
}

.content-container {
  padding: 2rem;
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
}

.editor-section {
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--card-bg);
  display: flex;
  flex-direction: column;
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
  
  .editor-main {
    height: auto;
    width: 100%;
  }
  
  .content-container {
    padding: 1rem;
    height: auto;
  }
}

</style>
