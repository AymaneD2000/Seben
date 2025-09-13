<template>
  <aside class="editor-sidebar">
    <!-- AI Assistant Header -->
    <div class="sidebar-header">
      <h3 class="sidebar-title">Assistant IA</h3>
      <div class="status-indicator">
        <span class="status-dot"></span>
        <span class="status-text">En ligne</span>
      </div>
    </div>

    <!-- Suggestions Section -->
    <div class="sidebar-section">
      <h4 class="section-title">Suggestions</h4>
      
      <div class="suggestions-list">
        <div 
          v-for="suggestion in suggestions" 
          :key="suggestion.id"
          class="suggestion-item"
        >
          <div class="suggestion-content">
            <h5 class="suggestion-title">{{ suggestion.title }}</h5>
            <p class="suggestion-description">{{ suggestion.description }}</p>
            <div class="suggestion-example">
              <span class="original">"{{ suggestion.original }}"</span>
              <span class="arrow">→</span>
              <span class="corrected">"{{ suggestion.corrected }}"</span>
            </div>
          </div>
          <button class="suggestion-apply" @click="applySuggestion(suggestion)">
            Appliquer
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="sidebar-section">
      <h4 class="section-title">Actions rapides</h4>
      
      <div class="quick-actions">
        <button class="action-btn" @click="checkGrammar">
          <MaterialIcon name="search" size="small" />
          <span class="action-text">Vérifier la grammaire</span>
        </button>
        
        <button class="action-btn" @click="translateToFrench">
          <MaterialIcon name="translate" size="small" />
          <span class="action-text">Traduire en français</span>
        </button>
        
        <button class="action-btn" @click="explainWords">
          <MaterialIcon name="menu_book" size="small" />
          <span class="action-text">Expliquer les mots</span>
        </button>
        
        <button class="action-btn" @click="checkPronunciation">
          <MaterialIcon name="volume_up" size="small" />
          <span class="action-text">Prononciation</span>
        </button>
      </div>
    </div>

    <!-- Chat with IA -->
    <div class="sidebar-section chat-section">
      <h4 class="section-title">Chat avec l'IA</h4>
      
      <div class="chat-messages" ref="chatMessages">
        <div 
          v-for="message in chatMessages" 
          :key="message.id"
          :class="['chat-message', message.sender === 'user' ? 'user-message' : 'ai-message']"
        >
          <div class="message-avatar">
            <MaterialIcon 
              v-if="message.sender === 'ai'" 
              name="support_agent" 
              size="small" 
              color="var(--accent-primary)" 
            />
            <MaterialIcon 
              v-else 
              name="account_circle" 
              size="small" 
              color="var(--text-secondary)" 
            />
          </div>
          <div class="message-content">
            <p class="message-text">{{ message.text }}</p>
          </div>
        </div>
      </div>
      
      <div class="chat-input-container">
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="I be nininkai daw fe? (Avez-vous une question?)"
          class="chat-input"
        />
        <button class="chat-send" @click="sendMessage" :disabled="!newMessage.trim()">
          <MaterialIcon name="send" size="small" />
        </button>
      </div>
      
      <div class="chat-footer">
        <div class="document-status">
          <span class="status-line">Ligne 1, Colonne 1</span>
          <span class="zoom-level">100%</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import MaterialIcon from './MaterialIcon.vue'

interface Suggestion {
  id: number
  title: string
  description: string
  original: string
  corrected: string
  type: string
}

interface ChatMessage {
  id: number
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
}

const suggestions = ref<Suggestion[]>([
  {
    id: 1,
    title: 'Correction grammaticale suggérée',
    description: 'N be bora → N be bo',
    original: 'N be bora',
    corrected: 'N be bo',
    type: 'grammar'
  },
  {
    id: 2,
    title: 'Amélioration de style',
    description: 'Nege in ka di → Nege in ka di kosɛbɛ',
    original: 'Nege in ka di',
    corrected: 'Nege in ka di kosɛbɛ',
    type: 'style'
  },
  {
    id: 3,
    title: 'Orthographe corrigée',
    description: 'sorali → sɔrɔli (déjà correct)',
    original: 'sorali',
    corrected: 'sɔrɔli',
    type: 'spelling'
  }
])

const chatMessages = ref<ChatMessage[]>([
  {
    id: 1,
    sender: 'ai',
    text: 'Bonjour ! Je peux vous aider à améliorer votre texte en bambara. Que souhaitez-vous faire ?',
    timestamp: new Date()
  }
])

const newMessage = ref('')
const chatMessages_ref = ref<HTMLElement>()

const emit = defineEmits<{
  applySuggestion: [suggestion: Suggestion]
  checkGrammar: []
  translateToFrench: []
  explainWords: []
  checkPronunciation: []
}>()

const applySuggestion = (suggestion: Suggestion) => {
  emit('applySuggestion', suggestion)
  // Remove applied suggestion
  suggestions.value = suggestions.value.filter(s => s.id !== suggestion.id)
}

const checkGrammar = () => {
  emit('checkGrammar')
}

const translateToFrench = () => {
  emit('translateToFrench')
}

const explainWords = () => {
  emit('explainWords')
}

const checkPronunciation = () => {
  emit('checkPronunciation')
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  const userMessage: ChatMessage = {
    id: Date.now(),
    sender: 'user',
    text: newMessage.value,
    timestamp: new Date()
  }

  chatMessages.value.push(userMessage)
  const messageText = newMessage.value
  newMessage.value = ''
  
  await scrollToBottom()
  
  // Simulate AI response
  setTimeout(() => {
    const aiResponse: ChatMessage = {
      id: Date.now(),
      sender: 'ai',
      text: getAIResponse(messageText),
      timestamp: new Date()
    }
    chatMessages.value.push(aiResponse)
    nextTick(() => scrollToBottom())
  }, 1000)
}

const getAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('grammaire') || lowerMessage.includes('grammar')) {
    return 'Je peux vérifier la grammaire de votre texte. Assurez-vous d\'utiliser les bonnes conjugaisons et la structure appropriée en bambara.'
  }
  
  if (lowerMessage.includes('correction') || lowerMessage.includes('corriger')) {
    return 'J\'ai analysé votre texte et trouvé quelques suggestions d\'amélioration. Consultez la section "Suggestions" ci-dessus.'
  }
  
  return 'Je suis là pour vous aider avec votre texte en bambara. Vous pouvez me demander de vérifier la grammaire, corriger l\'orthographe, ou expliquer des mots.'
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatMessages_ref.value) {
    chatMessages_ref.value.scrollTop = chatMessages_ref.value.scrollHeight
  }
}
</script>

<style scoped>
.editor-sidebar {
  width: 320px;
  background-color: var(--bg-secondary);
  border-left: 1px solid var(--border-color);
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
}

.status-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.sidebar-section {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.suggestion-item {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  border-color: var(--accent-primary);
}

.suggestion-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.suggestion-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.suggestion-example {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.original {
  color: var(--text-secondary);
  font-style: italic;
}

.arrow {
  color: var(--text-muted);
}

.corrected {
  color: var(--accent-primary);
  font-weight: 500;
}

.suggestion-apply {
  background-color: var(--accent-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
}

.suggestion-apply:hover {
  background-color: var(--accent-secondary);
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.action-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-primary);
}

.action-icon {
  font-size: 1.1rem;
}

.action-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: none;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 1rem;
}

.chat-message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background-color: var(--accent-primary);
}

.message-content {
  flex: 1;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  padding: 0.75rem;
}

.user-message .message-content {
  background-color: var(--accent-primary);
  color: white;
}

.message-text {
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

.chat-input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.chat-input {
  flex: 1;
  padding: 0.75rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.chat-input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.chat-input::placeholder {
  color: var(--text-muted);
}

.chat-send {
  background-color: var(--accent-primary);
  color: white;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-send:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.chat-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-footer {
  margin-top: auto;
}

.document-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: var(--bg-tertiary);
  border-radius: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .editor-sidebar {
    width: 100%;
    height: auto;
    max-height: 50vh;
  }
  
  .sidebar-header,
  .sidebar-section {
    padding: 1rem;
  }
  
  .suggestion-item {
    padding: 0.75rem;
  }
  
  .action-btn {
    padding: 0.75rem;
  }
  
  .chat-messages {
    max-height: 150px;
  }
}
</style>
