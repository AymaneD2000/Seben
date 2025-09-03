<template>
  <div class="text-editor-container">
    <!-- Editor Header -->
    <div class="editor-header">
      <h2 class="document-title">Éditeur de Texte Bambara</h2>
    </div>

    <!-- Main Editor Area -->
    <div class="editor-main">
      <textarea
        ref="editorTextarea"
        v-model="content"
        @input="handleInput"
        @keydown="handleKeyDown"
        @selectionchange="updateCursorPosition"
        @click="updateCursorPosition"
        class="editor-textarea"
        placeholder="Commencez à écrire votre texte en bambara..."
        spellcheck="false"
      ></textarea>
      
      <!-- Cursor Position Indicator -->
      <div class="cursor-info">
        <span>Ligne {{ cursorPosition.line }}, Colonne {{ cursorPosition.column }}</span>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="editor-status-bar">
      <div class="status-left">
        <span class="language-indicator">🌍 Bambara</span>
        <span class="encoding-indicator">UTF-8</span>
      </div>
      <div class="status-right">
        <button class="voice-input-btn" @click="toggleVoiceInput" :class="{ active: isRecording }">
          <img src="@/assets/microphone_icon.png" alt="Voice Input" class="voice-icon" />
          <span v-if="isRecording">Enregistrement...</span>
          <span v-else>Prêt</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const content = ref('I ni sogoma !')
const editorTextarea = ref<HTMLTextAreaElement>()
const isRecording = ref(false)
const cursorPosition = ref({ line: 1, column: 1 })

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

const handleInput = () => {
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
  if (!editorTextarea.value) return
  
  const textarea = editorTextarea.value
  const cursorPos = textarea.selectionStart
  const textBeforeCursor = content.value.substring(0, cursorPos)
  const lines = textBeforeCursor.split('\n')
  
  cursorPosition.value = {
    line: lines.length,
    column: lines[lines.length - 1].length + 1
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
  
  // Simulate voice input after 3 seconds
  setTimeout(() => {
    if (isRecording.value) {
      content.value += ' N b\'a fɔ ko...'
      isRecording.value = false
      handleInput()
    }
  }, 3000)
}

const stopVoiceRecording = () => {
  console.log('Stopping voice recording...')
}

const saveDocument = () => {
  // Save functionality would go here
  console.log('Saving document...')
}

const insertText = (text: string) => {
  if (!editorTextarea.value) return
  
  const textarea = editorTextarea.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  
  const newContent = content.value.substring(0, start) + text + content.value.substring(end)
  content.value = newContent
  
  nextTick(() => {
    textarea.focus()
    textarea.setSelectionRange(start + text.length, start + text.length)
    updateCursorPosition()
  })
}

const formatText = (format: string) => {
  if (!editorTextarea.value) return
  
  const textarea = editorTextarea.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.substring(start, end)
  
  if (selectedText) {
    let formattedText = selectedText
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `_${selectedText}_`
        break
    }
    
    const newContent = content.value.substring(0, start) + formattedText + content.value.substring(end)
    content.value = newContent
    
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + formattedText.length)
      updateCursorPosition()
    })
  }
}

// Expose methods for parent components
defineExpose({
  insertText,
  formatText,
  content: computed(() => content.value),
  wordCount,
  characterCount,
  cursorPosition: computed(() => cursorPosition.value)
})

// Watch for content changes
watch(content, () => {
  handleInput()
}, { immediate: true })
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

.editor-textarea {
  flex: 1;
  width: 100%;
  padding: 2rem;
  border: none;
  outline: none;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1.125rem;
  line-height: 1.8;
  resize: none;
  overflow-y: auto;
}

.editor-textarea::placeholder {
  color: var(--text-muted);
  font-style: italic;
}

.editor-textarea:focus {
  background-color: var(--bg-primary);
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
  
  .editor-textarea {
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
