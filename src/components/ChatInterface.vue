<template>
  <div class="chat-interface">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="chat-title-section">
        <h1 class="chat-title">Assistant IA Bambara</h1>
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">En ligne</span>
        </div>
      </div>
      <div class="chat-actions">
        <button class="header-btn" title="Nouvelle conversation">
          <MaterialIcon name="add" size="small" />
        </button>
        <button class="header-btn" title="Paramètres">
          <MaterialIcon name="settings" size="small" />
        </button>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', message.sender === 'user' ? 'user-message' : 'assistant-message']"
      >
        <div class="message-avatar">
          <MaterialIcon 
            v-if="message.sender === 'assistant'" 
            name="support_agent" 
            size="medium" 
            color="var(--accent-primary)" 
          />
          <MaterialIcon 
            v-else 
            name="account_circle" 
            size="medium" 
            color="var(--text-secondary)" 
          />
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-sender">
              {{ message.sender === 'assistant' ? 'Assistant IA' : 'Vous' }}
            </span>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <div class="message-text" v-html="formatMessage(message.text)"></div>
          
          <!-- Examples section for assistant messages -->
          <div v-if="message.examples" class="message-examples">
            <h4 class="examples-title">Exemples d'utilisation :</h4>
            <div 
              v-for="(example, index) in message.examples" 
              :key="index"
              class="example-item"
            >
              <div class="example-bambara">{{ example.bambara }}</div>
              <div class="example-french">{{ example.french }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Typing indicator -->
      <div v-if="isTyping" class="message assistant-message typing-message">
        <div class="message-avatar">
          <MaterialIcon name="support_agent" size="medium" color="var(--accent-primary)" />
        </div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-area">
      <div class="input-container">
        <button class="input-btn" :title="t.chat.attachFile">
          <MaterialIcon name="attach_file" size="medium" />
        </button>
        <button class="input-btn" :title="t.chat.voiceRecord">
          <MaterialIcon name="mic" size="medium" />
        </button>
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          :placeholder="t.chat.placeholder"
          class="message-input"
        />
        <button 
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="send-btn"
        >
          <MaterialIcon name="send" size="medium" />
        </button>
      </div>
      <div class="input-footer">
        <span class="footer-text">{{ t.chat.footer }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'

const i18nStore = useI18nStore()
const { t } = storeToRefs(i18nStore)

interface MessageExample {
  bambara: string
  french: string
}

interface Message {
  id: number
  sender: 'user' | 'assistant'
  text: string
  time: string
  examples?: MessageExample[]
}

const messages = ref<Message[]>([
  {
    id: 1,
    sender: 'assistant',
    text: 'I ni sogoma ! (Bonjour !)<br><br>N ye i ka nnamaya ye bambara kan na. N be se ka i deme ni :<br><br>• Kanuya (Les règles de grammaire)<br>• Focogo (La construction de phrases)<br>• Daɲɛgafe (Les définitions de mots)<br>• Kanuya (Les traductions)<br>• Sinjɛta (Les explications culturelles)<br><br><em>Ne be i deme cogo di ?</em> (Comment puis-je vous aider ?)',
    time: 'Maintenant'
  }
])

const newMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement>()

const formatMessage = (text: string) => {
  return text.replace(/\n/g, '<br>')
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  const userMessage: Message = {
    id: Date.now(),
    sender: 'user',
    text: newMessage.value,
    time: new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  messages.value.push(userMessage)
  const messageText = newMessage.value
  newMessage.value = ''
  
  await scrollToBottom()
  
  // Simulate typing
  isTyping.value = true
  
  // Simulate AI response
  setTimeout(() => {
    isTyping.value = false
    const response = generateResponse(messageText)
    messages.value.push(response)
    nextTick(() => scrollToBottom())
  }, 2000)
}

const generateResponse = (userMessage: string): Message => {
  // Simple response generation based on keywords
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('sogoma')) {
    return {
      id: Date.now(),
      sender: 'assistant',
      text: 'En bambara, "bonjour" se dit <strong>"I ni sogoma"</strong> (le matin) ou <strong>"I ni tile"</strong> (le jour).',
      time: 'Il y a 2 min',
      examples: [
        { bambara: 'I ni sogoma', french: 'Bonjour (le matin)' },
        { bambara: 'I ni tile', french: 'Bonjour (le jour)' },
        { bambara: 'I ni wula', french: 'Bonjour (l\'après-midi)' }
      ]
    }
  }
  
  if (lowerMessage.includes('comment') || lowerMessage.includes('cogo')) {
    return {
      id: Date.now(),
      sender: 'assistant',
      text: 'Pour poser une question en bambara, vous pouvez utiliser plusieurs structures. "Comment dit-on..." se traduit par "Cogo bɛ fɔ..."',
      time: 'Il y a 2 min',
      examples: [
        { bambara: 'Cogo bɛ fɔ nin ye bambara la?', french: 'Comment dit-on cela en bambara ?' },
        { bambara: 'A bɛ kɛ cogo?', french: 'Comment ça se fait ?' }
      ]
    }
  }
  
  return {
    id: Date.now(),
    sender: 'assistant',
    text: 'Je comprends votre question. Pouvez-vous être plus précis sur ce que vous aimeriez savoir sur la langue bambara ?',
    time: 'Il y a 2 min'
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-primary);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.chat-title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
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

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.header-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-btn:hover {
  background-color: var(--accent-primary);
  color: white;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  gap: 1rem;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.assistant-message {
  align-self: flex-start;
}

.message-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background-color: var(--accent-primary);
}

.message-content {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  flex: 1;
}

.user-message .message-content {
  background-color: var(--accent-primary);
  color: white;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.message-sender {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.user-message .message-sender {
  color: rgba(255, 255, 255, 0.8);
}

.message-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.user-message .message-time {
  color: rgba(255, 255, 255, 0.6);
}

.message-text {
  line-height: 1.6;
  color: var(--text-primary);
}

.user-message .message-text {
  color: white;
}

.message-examples {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.examples-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.example-item {
  background-color: var(--bg-secondary);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid var(--accent-primary);
}

.example-bambara {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  font-style: italic;
}

.example-french {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.typing-message .message-content {
  padding: 1rem 1.25rem 0.75rem;
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: var(--text-muted);
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.input-area {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 2rem 1rem;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 2rem;
  padding: 0.75rem 1rem;
}

.input-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-btn:hover {
  background-color: var(--bg-tertiary);
}

.input-icon {
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
}

.message-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 1rem;
  padding: 0.5rem 0;
}

.message-input::placeholder {
  color: var(--text-muted);
}

.send-btn {
  background-color: var(--accent-primary);
  color: white;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.send-btn:hover:not(:disabled) {
  background-color: var(--accent-secondary);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-footer {
  margin-top: 0.75rem;
  text-align: center;
}

.footer-text {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .chat-header {
    padding: 1rem;
  }
  
  .chat-title {
    font-size: 1.25rem;
  }
  
  .messages-container {
    padding: 1rem;
  }
  
  .message {
    max-width: 90%;
  }
  
  .input-area {
    padding: 1rem;
  }
  
  .input-container {
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
  
  .message-input {
    font-size: 0.95rem;
  }
}
</style>
