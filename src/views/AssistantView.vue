<template>
  <DashboardLayout>
    <div class="assistant-view">
      <div class="assistant-layout">
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
import ChatInterface from '@/components/ChatInterface.vue'

const chatInterface = ref()
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
  height: 100vh;
  width: 100%;
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
  
  
  .assistant-main {
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
