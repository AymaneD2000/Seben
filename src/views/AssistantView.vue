<template>
  <DashboardLayout>
    <div class="assistant-view">
      <h1>Page Assistant</h1>
      <p>Cette page fonctionne !</p>
      <div class="assistant-layout">
        <!-- Assistant Sidebar -->
        <aside class="assistant-sidebar">
          <AssistantSidebar 
            @select-action="handleActionSelect"
            @select-conversation="handleConversationSelect"
          />
        </aside>
        
        <!-- Main Chat Area -->
        <main class="assistant-main">
          <div class="content-container">
            <div class="chat-container">
              <ChatInterface ref="chatInterface" />
            </div>
          </div>
        </main>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
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
  margin-left: 280px; /* Space for AppSidebar - same for both states */
}

.assistant-sidebar {
  width: 280px; /* Reduced width to match AppSidebar */
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  height: 100vh;
  position: fixed;
  left: 280px; /* Position after AppSidebar */
  top: 0;
  overflow-y: auto;
  z-index: 100;
}

.assistant-main {
  flex: 1;
  margin-left: 280px; /* Reduced margin to get closer to navbar */
  height: 100vh;
  width: calc(100% - 280px);
  max-width: none;
}

.content-container {
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: absolute;
  top: -1rem; /* Move title frame higher */
  left: 0;
  right: 0;
  bottom: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .assistant-layout {
    margin-left: 0;
    flex-direction: column;
  }
  
  .assistant-sidebar {
    position: relative;
    left: 3rem;
    width: 100%;
    height: auto;
    max-height: 50vh;
    overflow-y: auto;
  }
  
  .assistant-main {
    margin-left: 0;
    margin-right: 0;
    height: auto;
    width: 100%;
  }
  
  .content-container {
    padding: 0;
    height: auto;
    position: relative;
  }
  
  .chat-container {
    width: 100%;
    height: auto;
    padding: 1rem;
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
  }
}
</style>
