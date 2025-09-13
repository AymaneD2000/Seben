<template>
  <aside class="assistant-sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <h2 class="sidebar-title">Assistant IA</h2>
      <p class="sidebar-subtitle">Posez vos questions sur la langue bambara</p>
    </div>

    <!-- Quick Actions -->
    <div class="sidebar-section">
      <h3 class="section-title">Actions rapides</h3>
      <div class="action-buttons">
        <button class="action-btn" @click="selectAction('grammar')">
          <MaterialIcon name="school" size="small" />
          <span class="action-text">Grammaire</span>
        </button>
        <button class="action-btn" @click="selectAction('phrases')">
          <MaterialIcon name="link" size="small" />
          <span class="action-text">Construction de phrases</span>
        </button>
        <button class="action-btn" @click="selectAction('translation')">
          <MaterialIcon name="translate" size="small" />
          <span class="action-text">Traduction</span>
        </button>
        <button class="action-btn" @click="selectAction('definitions')">
          <MaterialIcon name="menu_book" size="small" />
          <span class="action-text">Définitions</span>
        </button>
      </div>
    </div>

    <!-- Recent Conversations -->
    <div class="sidebar-section">
      <h3 class="section-title">Conversations récentes</h3>
      <div class="conversation-list">
        <div class="conversation-item" @click="selectConversation('new')">
          <MaterialIcon name="chat" size="small" color="var(--accent-primary)" />
          <div class="conversation-content">
            <div class="conversation-title">Nouvelle conversation</div>
            <div class="conversation-subtitle">Commencez à discuter</div>
          </div>
        </div>
        <div class="conversation-item" @click="selectConversation('grammar')">
          <MaterialIcon name="school" size="small" color="var(--accent-primary)" />
          <div class="conversation-content">
            <div class="conversation-title">Grammaire bambara</div>
            <div class="conversation-time">Il y a 2h</div>
          </div>
        </div>
        <div class="conversation-item" @click="selectConversation('phrases')">
          <MaterialIcon name="link" size="small" color="var(--accent-primary)" />
          <div class="conversation-content">
            <div class="conversation-title">Construction de phrases</div>
            <div class="conversation-time">Il y a 1j</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'

const emit = defineEmits<{
  selectAction: [action: string]
  selectConversation: [conversation: string]
}>()

const selectAction = (action: string) => {
  emit('selectAction', action)
}

const selectConversation = (conversation: string) => {
  emit('selectConversation', conversation)
}
</script>

<style scoped>
.assistant-sidebar {
  width: 280px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  padding: 2rem 1.5rem;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
}

.sidebar-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.sidebar-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.action-buttons {
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
  transform: translateX(4px);
}

.action-icon {
  margin-right: 0.5rem;
}

.action-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}

.conversation-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.conversation-item:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-primary);
  transform: translateX(4px);
}

.conversation-icon {
  font-size: 1.1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
  border-radius: 50%;
}

.conversation-content {
  flex: 1;
}

.conversation-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.conversation-subtitle,
.conversation-time {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .assistant-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
  }
  
  .sidebar-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
  
  .sidebar-title {
    font-size: 1.25rem;
  }
  
  .sidebar-subtitle {
    font-size: 0.9rem;
  }
  
  .sidebar-section {
    margin-bottom: 1.5rem;
  }
  
  .action-btn,
  .conversation-item {
    padding: 0.75rem;
  }
  
  .action-text,
  .conversation-title {
    font-size: 0.9rem;
  }
}
</style>
