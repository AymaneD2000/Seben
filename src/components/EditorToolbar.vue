<template>
  <div class="editor-toolbar">
    <!-- File Operations -->
    <div class="toolbar-group">
      <button class="toolbar-btn" title="Nouveau document" @click="newDocument">
        <MaterialIcon name="note_add" size="small" />
      </button>
      <button class="toolbar-btn" title="Télécharger" @click="downloadDocument">
        <MaterialIcon name="download" size="small" />
      </button>
      <button class="toolbar-btn" title="Imprimer" @click="printDocument">
        <MaterialIcon name="print" size="small" />
      </button>
    </div>

    <div class="toolbar-divider"></div>

    <!-- Text Formatting -->
    <div class="toolbar-group">
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.bold }"
        title="Gras" 
        @click="toggleFormat('bold')"
      >
        <strong>B</strong>
      </button>
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.italic }"
        title="Italique" 
        @click="toggleFormat('italic')"
      >
        <em>I</em>
      </button>
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.underline }"
        title="Souligné" 
        @click="toggleFormat('underline')"
      >
        <u>U</u>
      </button>
    </div>

    <div class="toolbar-divider"></div>

    <!-- List Formatting -->
    <div class="toolbar-group">
      <button class="toolbar-btn" title="Liste à puces" @click="insertList('ul')">
        <MaterialIcon name="format_list_bulleted" size="small" />
      </button>
      <button class="toolbar-btn" title="Liste numérotée" @click="insertList('ol')">
        <MaterialIcon name="format_list_numbered" size="small" />
      </button>
    </div>

    <!-- Document Info -->
    <div class="document-info">
      <span class="info-item">Mots: <strong>{{ wordCount }}</strong></span>
      <span class="info-item">Caractères: <strong>{{ characterCount }}</strong></span>
      <span class="info-item">Langue: <strong>{{ language }}</strong></span>
    </div>

    <!-- Settings -->
    <div class="toolbar-group ml-auto">
      <button class="toolbar-btn" title="Paramètres" @click="openSettings">
        <MaterialIcon name="settings" size="small" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MaterialIcon from './MaterialIcon.vue'

const formatStates = ref({
  bold: false,
  italic: false,
  underline: false
})

const props = defineProps<{
  wordCount: number
  characterCount: number
  language: string
}>()

const emit = defineEmits<{
  newDocument: []
  downloadDocument: []
  printDocument: []
  toggleFormat: [format: string]
  insertList: [type: string]
  openSettings: []
}>()

const newDocument = () => {
  emit('newDocument')
}

const downloadDocument = () => {
  emit('downloadDocument')
}

const printDocument = () => {
  emit('printDocument')
}

const toggleFormat = (format: string) => {
  formatStates.value[format as keyof typeof formatStates.value] = !formatStates.value[format as keyof typeof formatStates.value]
  emit('toggleFormat', format)
}

const insertList = (type: string) => {
  emit('insertList', type)
}

const openSettings = () => {
  emit('openSettings')
}
</script>

<style scoped>
.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.toolbar-btn:hover {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.format-btn.active {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.toolbar-divider {
  width: 1px;
  height: 1.5rem;
  background-color: var(--border-color);
}

.document-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
  margin-right: 1rem;
}

.info-item {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.info-item strong {
  color: var(--text-primary);
}

.ml-auto {
  margin-left: auto;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .editor-toolbar {
    padding: 0.5rem 1rem;
    gap: 0.75rem;
  }
  
  .toolbar-btn {
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
  
  .document-info {
    display: none;
  }
  
  .toolbar-group {
    gap: 0.25rem;
  }
}

@media (max-width: 480px) {
  .editor-toolbar {
    flex-wrap: wrap;
    padding: 0.5rem;
  }
  
  .toolbar-divider {
    display: none;
  }
}
</style>
