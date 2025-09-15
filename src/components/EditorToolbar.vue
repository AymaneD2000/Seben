<template>
  <div class="editor-toolbar">
    <!-- File Operations -->
    <div class="toolbar-group">
      <button class="toolbar-btn" title="Nouveau document" @click="newDocument">
        <MaterialIcon name="note_add" size="small" />
      </button>
      <button class="toolbar-btn" title="Nouvelle page" @click="newPage">
        <MaterialIcon name="add_box" size="small" />
      </button>
      <button class="toolbar-btn" title="Télécharger" @click="downloadDocument">
        <MaterialIcon name="download" size="small" />
      </button>
      <button class="toolbar-btn" title="Imprimer" @click="printDocument">
        <MaterialIcon name="print" size="small" />
      </button>
    </div>

    <div class="toolbar-divider"></div>

    <!-- Undo/Redo -->
    <div class="toolbar-group">
      <button class="toolbar-btn" title="Annuler" @click="undo">
        <MaterialIcon name="undo" size="small" />
      </button>
      <button class="toolbar-btn" title="Rétablir" @click="redo">
        <MaterialIcon name="redo" size="small" />
      </button>
    </div>

    <div class="toolbar-divider"></div>

    <!-- Font Family -->
    <div class="toolbar-group">
      <select class="toolbar-select" @change="changeFontFamily" title="Police">
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
        <option value="Helvetica">Helvetica</option>
      </select>
    </div>

    <div class="toolbar-divider"></div>

    <!-- Font Size -->
    <div class="toolbar-group">
      <select class="toolbar-select" @change="changeFontSize" title="Taille de police">
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12" selected>12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28">28</option>
        <option value="32">32</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="72">72</option>
      </select>
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
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.strikethrough }"
        title="Barré" 
        @click="toggleFormat('strikeThrough')"
      >
        <s>S</s>
      </button>
    </div>

    <div class="toolbar-divider"></div>

    <!-- Text Alignment -->
    <div class="toolbar-group">
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.alignLeft }"
        title="Aligner à gauche" 
        @click="toggleFormat('justifyLeft')"
      >
        <MaterialIcon name="format_align_left" size="small" />
      </button>
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.alignCenter }"
        title="Centrer" 
        @click="toggleFormat('justifyCenter')"
      >
        <MaterialIcon name="format_align_center" size="small" />
      </button>
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.alignRight }"
        title="Aligner à droite" 
        @click="toggleFormat('justifyRight')"
      >
        <MaterialIcon name="format_align_right" size="small" />
      </button>
      <button 
        class="toolbar-btn format-btn" 
        :class="{ active: formatStates.alignJustify }"
        title="Justifier" 
        @click="toggleFormat('justifyFull')"
      >
        <MaterialIcon name="format_align_justify" size="small" />
      </button>
    </div>

    <div class="toolbar-divider"></div>

    <!-- Text Color -->
    <div class="toolbar-group">
      <button class="toolbar-btn" title="Couleur du texte" @click="openColorPicker('foreColor')">
        <MaterialIcon name="format_color_text" size="small" />
      </button>
      <button class="toolbar-btn" title="Couleur de surlignage" @click="openColorPicker('backColor')">
        <MaterialIcon name="format_color_fill" size="small" />
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
  underline: false,
  strikethrough: false,
  alignLeft: false,
  alignCenter: false,
  alignRight: false,
  alignJustify: false
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
  changeFontFamily: [fontFamily: string]
  changeFontSize: [fontSize: string]
  openColorPicker: [type: string]
  insertList: [type: string]
  openSettings: []
  undo: []
  redo: []
  newPage: []
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

const changeFontFamily = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('changeFontFamily', target.value)
}

const changeFontSize = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('changeFontSize', target.value)
}

const openColorPicker = (type: string) => {
  emit('openColorPicker', type)
}

const undo = () => {
  emit('undo')
}

const redo = () => {
  emit('redo')
}

const newPage = () => {
  emit('newPage')
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

.toolbar-select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 80px;
}

.toolbar-select:hover {
  border-color: var(--accent-primary);
}

.toolbar-select:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(var(--accent-primary-rgb), 0.2);
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
