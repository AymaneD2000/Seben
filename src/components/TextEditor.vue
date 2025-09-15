<template>
  <div class="text-editor-container">
    <!-- Editor Header -->
    <div class="editor-header">
      <h2 class="document-title">{{ t.editor.title }}</h2>
    </div>

    <!-- Main Editor Area -->
    <div class="editor-main">
      <div
        ref="editorContent"
        contenteditable="true"
        @input="handleInput"
        @keydown="handleKeyDown"
        @selectionchange="updateCursorPosition"
        @click="updateCursorPosition"
        class="editor-content"
        :data-placeholder="t.editor.placeholder"
        spellcheck="false"
      ></div>
      
      <!-- Cursor Position Indicator -->
      <div class="cursor-info">
        <span>Ligne {{ cursorPosition.line }}, Colonne {{ cursorPosition.column }}</span>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="editor-status-bar">
      <div class="status-left">
        <span class="language-indicator">
          <MaterialIcon name="language" size="small" />
          Bambara
        </span>
        <span class="encoding-indicator">UTF-8</span>
      </div>
      <div class="status-right">
        <button class="voice-input-btn" @click="toggleVoiceInput" :class="{ active: isRecording }">
          <MaterialIcon name="mic" size="small" />
          <span v-if="isRecording">{{ t.editor.status.recording }}</span>
          <span v-else>{{ t.editor.status.ready }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import { useI18nStore } from '@/stores/i18n'
import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'

const i18nStore = useI18nStore()
const historyStore = useHistoryStore()
const { t } = storeToRefs(i18nStore)

const content = ref('I ni sogoma !')
const editorContent = ref<HTMLDivElement>()
const history = ref<string[]>([])
const historyIndex = ref(-1)

// Initialize editor content
const initializeEditor = () => {
  if (editorContent.value) {
    editorContent.value.textContent = content.value
    // Initialize history with initial content
    history.value = [content.value]
    historyIndex.value = 0
  }
}

// Initialize on mount
onMounted(() => {
  initializeEditor()
})
const isRecording = ref(false)
const cursorPosition = ref({ line: 1, column: 1 })
const documentId = ref(`doc_${Date.now()}`)
const documentTitle = ref('Nouveau document')

const wordCount = computed(() => {
  return content.value.trim().split(/\s+/).filter(word => word.length > 0).length
})

const characterCount = computed(() => {
  return content.value.length
})

const lineCount = computed(() => {
  return content.value.split('\n').length
})

const emit = defineEmits<{
  contentChanged: [content: string, stats: { words: number, characters: number, lines: number }]
  cursorPositionChanged: [position: { line: number, column: number }]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLDivElement
  // Update content with innerHTML to preserve formatting
  content.value = target.innerHTML
  saveToHistory()
  updateCursorPosition()
  emit('contentChanged', content.value, {
    words: wordCount.value,
    characters: characterCount.value,
    lines: lineCount.value
  })
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Handle special key combinations
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 's':
        event.preventDefault()
        saveDocument()
        break
      case 'z':
        event.preventDefault()
        // Undo functionality would go here
        break
      case 'y':
        event.preventDefault()
        // Redo functionality would go here
        break
    }
  }
  
  // Update cursor position after key press
  nextTick(() => {
    updateCursorPosition()
  })
}

const updateCursorPosition = () => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  const textNode = range.startContainer
  const textContent = textNode.textContent || ''
  const lines = textContent.split('\n')
  
  cursorPosition.value = {
    line: lines.length,
    column: range.startOffset + 1
  }
  
  emit('cursorPositionChanged', cursorPosition.value)
}

const toggleVoiceInput = () => {
  isRecording.value = !isRecording.value
  
  if (isRecording.value) {
    startVoiceRecording()
  } else {
    stopVoiceRecording()
  }
}

const startVoiceRecording = () => {
  // Voice recording implementation would go here
  console.log('Starting voice recording...')
  
  // Ne pas enregistrer dans l'historique car ce n'est pas un document final
  
  // Simulate voice input after 3 seconds
  setTimeout(() => {
    if (isRecording.value) {
      content.value += ' N b\'a fɔ ko...'
      isRecording.value = false
      handleInput()
      
      // Ne pas enregistrer dans l'historique car ce n'est pas un document final
    }
  }, 3000)
}

const stopVoiceRecording = () => {
  console.log('Stopping voice recording...')
}

const saveDocument = () => {
  // Save functionality would go here
  console.log('Saving document...')
  
  // Mettre à jour le titre du document basé sur le contenu
  if (content.value.trim()) {
    const firstLine = content.value.split('\n')[0].trim()
    if (firstLine && firstLine.length > 0) {
      documentTitle.value = firstLine.substring(0, 30) + (firstLine.length > 30 ? '...' : '')
    }
  }
  
  // Enregistrer dans l'historique
  historyStore.addHistoryItem({
    type: 'document',
    page: 'editor',
    action: documentTitle.value, // Juste le titre du document
    details: 'Document créé dans l\'éditeur',
    icon: 'description',
    documentId: documentId.value,
    documentTitle: documentTitle.value,
    documentContent: content.value
  })
}

const insertText = (text: string) => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(document.createTextNode(text))
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
  // Update content
  content.value = editorContent.value.innerHTML
}

const formatText = (format: string) => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  if (range.collapsed) return // No selection
  
  // Apply formatting using modern approach
  const selectedText = range.toString()
  if (!selectedText) return
  
  let formattedText = selectedText
  
  switch (format) {
    case 'bold':
      formattedText = `<strong>${selectedText}</strong>`
      break
    case 'italic':
      formattedText = `<em>${selectedText}</em>`
      break
    case 'underline':
      formattedText = `<u>${selectedText}</u>`
      break
    case 'strikeThrough':
      formattedText = `<s>${selectedText}</s>`
      break
    case 'justifyLeft':
      formattedText = `<div style="text-align: left;">${selectedText}</div>`
      break
    case 'justifyCenter':
      formattedText = `<div style="text-align: center;">${selectedText}</div>`
      break
    case 'justifyRight':
      formattedText = `<div style="text-align: right;">${selectedText}</div>`
      break
    case 'justifyFull':
      formattedText = `<div style="text-align: justify;">${selectedText}</div>`
      break
  }
  
  // Replace the selected text with formatted text
  range.deleteContents()
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = formattedText
  const fragment = document.createDocumentFragment()
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild)
  }
  range.insertNode(fragment)
  
  // Update content
  content.value = editorContent.value.innerHTML
}

const changeFontFamily = (fontFamily: string) => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  if (range.collapsed) return // No selection
  
  const selectedText = range.toString()
  if (!selectedText) return
  
  const formattedText = `<span style="font-family: ${fontFamily};">${selectedText}</span>`
  
  range.deleteContents()
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = formattedText
  const fragment = document.createDocumentFragment()
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild)
  }
  range.insertNode(fragment)
  
  content.value = editorContent.value.innerHTML
}

const changeFontSize = (fontSize: string) => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  if (range.collapsed) return // No selection
  
  const selectedText = range.toString()
  if (!selectedText) return
  
  const formattedText = `<span style="font-size: ${fontSize}px;">${selectedText}</span>`
  
  range.deleteContents()
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = formattedText
  const fragment = document.createDocumentFragment()
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild)
  }
  range.insertNode(fragment)
  
  content.value = editorContent.value.innerHTML
}

const openColorPicker = (type: string) => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  if (range.collapsed) return // No selection
  
  const selectedText = range.toString()
  if (!selectedText) return
  
  // Create a temporary color input
  const colorInput = document.createElement('input')
  colorInput.type = 'color'
  colorInput.style.position = 'absolute'
  colorInput.style.left = '-9999px'
  document.body.appendChild(colorInput)
  
  colorInput.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    const color = target.value
    
    let formattedText = selectedText
    if (type === 'foreColor') {
      formattedText = `<span style="color: ${color};">${selectedText}</span>`
    } else if (type === 'backColor') {
      formattedText = `<span style="background-color: ${color};">${selectedText}</span>`
    }
    
    range.deleteContents()
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = formattedText
    const fragment = document.createDocumentFragment()
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }
    range.insertNode(fragment)
    
    content.value = editorContent.value!.innerHTML
    document.body.removeChild(colorInput)
  })
  
  colorInput.click()
}

const insertList = (type: string) => {
  if (!editorContent.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  
  const range = selection.getRangeAt(0)
  const selectedText = range.toString()
  
  let listHTML = ''
  if (type === 'ul') {
    listHTML = '<ul><li>Élément de liste</li></ul>'
  } else if (type === 'ol') {
    listHTML = '<ol><li>Élément de liste</li></ol>'
  }
  
  if (selectedText) {
    // Replace selected text with list
    range.deleteContents()
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = listHTML
    const fragment = document.createDocumentFragment()
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }
    range.insertNode(fragment)
  } else {
    // Insert list at cursor position
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = listHTML
    const fragment = document.createDocumentFragment()
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }
    range.insertNode(fragment)
  }
  
  content.value = editorContent.value.innerHTML
}

const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    const previousContent = history.value[historyIndex.value]
    if (editorContent.value) {
      editorContent.value.innerHTML = previousContent
      content.value = previousContent
    }
  }
}

const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    const nextContent = history.value[historyIndex.value]
    if (editorContent.value) {
      editorContent.value.innerHTML = nextContent
      content.value = nextContent
    }
  }
}

const newPage = () => {
  if (editorContent.value) {
    const pageBreak = '<div style="page-break-before: always; height: 50px; border-top: 2px dashed #ccc; margin: 20px 0;"></div>'
    editorContent.value.innerHTML += pageBreak
    content.value = editorContent.value.innerHTML
    saveToHistory()
  }
}

const saveToHistory = () => {
  const currentContent = editorContent.value?.innerHTML || ''
  // Remove any content after current index
  history.value = history.value.slice(0, historyIndex.value + 1)
  // Add new content
  history.value.push(currentContent)
  historyIndex.value = history.value.length - 1
  // Limit history size
  if (history.value.length > 50) {
    history.value.shift()
    historyIndex.value--
  }
}

// Expose methods for parent components
defineExpose({
  insertText,
  formatText,
  changeFontFamily,
  changeFontSize,
  openColorPicker,
  insertList,
  undo,
  redo,
  newPage,
  content: computed(() => content.value),
  wordCount,
  characterCount,
  cursorPosition: computed(() => cursorPosition.value)
})

// Watch for content changes
watch(content, (newContent) => {
  if (editorContent.value && editorContent.value.innerHTML !== newContent) {
    editorContent.value.innerHTML = newContent
  }
})
</script>

<style scoped>
.text-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-primary);
}

.editor-header {
  padding: 1rem 1.5rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.document-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.editor-main {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.editor-content {
  flex: 1;
  width: 100%;
  padding: 2rem;
  border: 1px solid var(--border-color);
  outline: none;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 1.125rem;
  line-height: 1.8;
  overflow-y: auto;
  min-height: 500px;
}

.editor-content:empty:before {
  content: attr(data-placeholder);
  color: var(--text-muted);
  font-style: italic;
  pointer-events: none;
}

.editor-content:focus {
  background-color: var(--bg-primary);
}

/* Styles for lists and formatting */
.editor-content ul,
.editor-content ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.editor-content li {
  margin: 0.5rem 0;
}

.editor-content strong {
  font-weight: bold;
}

.editor-content em {
  font-style: italic;
}

.editor-content u {
  text-decoration: underline;
}

.editor-content s {
  text-decoration: line-through;
}

.cursor-info {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  background-color: var(--bg-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  pointer-events: none;
}

.editor-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  font-size: 0.875rem;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.language-indicator,
.encoding-indicator {
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  background-color: var(--bg-tertiary);
  border-radius: 0.25rem;
}

.status-right {
  display: flex;
  align-items: center;
}

.voice-input-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.voice-input-btn:hover {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.voice-input-btn.active {
  background-color: #ef4444;
  border-color: #ef4444;
  color: white;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.voice-icon {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .editor-header {
    padding: 0.75rem 1rem;
  }
  
  .document-title {
    font-size: 1.125rem;
  }
  
  .editor-content {
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .editor-status-bar {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .status-left {
    gap: 0.5rem;
  }
  
  .cursor-info {
    display: none;
  }
  
  .voice-input-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .voice-icon {
    width: 0.875rem;
    height: 0.875rem;
  }
}
</style>
