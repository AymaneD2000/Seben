<template>
  <div class="assistant-view">
    <AppHeader />
    
    <div class="assistant-layout">
      <!-- Sidebar -->
      <AssistantSidebar 
        @select-action="handleActionSelect"
        @select-conversation="handleConversationSelect"
      />
      
      <!-- Main Chat Area -->
      <main class="assistant-main">
        <ChatInterface ref="chatInterface" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AssistantSidebar from '@/components/AssistantSidebar.vue'
import ChatInterface from '@/components/ChatInterface.vue'

const chatInterface = ref()

const handleActionSelect = (action: string) => {
  console.log('Selected action:', action)
  
  // Send a message to the chat based on the selected action
  const actionMessages = {
    grammar: 'Pouvez-vous m\'expliquer les règles de grammaire en bambara ?',
    phrases: 'Comment construire des phrases en bambara ?',
    translation: 'Comment traduire du français vers le bambara ?',
    definitions: 'Pouvez-vous me donner des définitions de mots en bambara ?'
  }
  
  const message = actionMessages[action as keyof typeof actionMessages]
  if (message && chatInterface.value) {
    // This would trigger the message in the chat interface
    // For now, we'll just log it
    console.log('Would send message:', message)
  }
}

const handleConversationSelect = (conversation: string) => {
  console.log('Selected conversation:', conversation)
  
  if (conversation === 'new') {
    // Start a new conversation
    console.log('Starting new conversation')
  } else {
    // Load existing conversation
    console.log('Loading conversation:', conversation)
  }
}
</script>

<style scoped>
.assistant-view {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.assistant-layout {
  display: flex;
  position: relative;
}

.assistant-main {
  flex: 1;
  margin-left: 280px;
  height: calc(100vh - 80px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .assistant-layout {
    flex-direction: column;
  }
  
  .assistant-main {
    margin-left: 0;
    height: calc(100vh - 200px);
  }
}
</style>
