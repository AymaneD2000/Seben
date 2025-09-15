<template>
  <div class="history-panel">
    <div class="history-header">
      <h3 class="history-title">{{ t.history.title }}</h3>
      <div class="history-actions">
        <button @click="clearAllHistory" class="clear-btn">
          <MaterialIcon name="clear_all" size="small" />
          {{ t.history.clearAll }}
        </button>
      </div>
    </div>

    <div class="history-content">
      <div v-if="historyByPage && Object.keys(historyByPage).length === 0" class="no-history">
        <MaterialIcon name="history" size="large" />
        <p>{{ t.history.noHistory }}</p>
      </div>

      <div v-else class="history-sections">
        <div 
          v-for="(pageHistory, page) in historyByPage" 
          :key="page"
          class="history-section"
        >
          <div class="section-header">
            <h4 class="section-title">
              <MaterialIcon :name="getPageIcon(page)" size="small" />
              {{ t.history.pages[page] }}
            </h4>
            <button 
              @click="clearPageHistory(page)"
              class="clear-page-btn"
              :title="t.history.removePageHistory"
            >
              <MaterialIcon name="close" size="small" />
            </button>
          </div>

          <div class="history-items">
            <div 
              v-for="item in pageHistory.slice(0, 10)" 
              :key="item.id"
              class="history-item"
              @click="navigateToHistoryItem(item)"
            >
              <div class="item-icon">
                <MaterialIcon :name="item.icon" size="small" />
              </div>
              <div class="item-content">
                <div class="item-action">{{ item.action }}</div>
                <div v-if="item.details" class="item-details">{{ item.details }}</div>
                <div class="item-time">{{ formatTime(item.timestamp) }}</div>
              </div>
            <button 
              @click.stop="removeHistoryItem(item.id)"
              class="item-remove"
              :title="t.history.removeItem"
            >
                <MaterialIcon name="close" size="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'
import MaterialIcon from './MaterialIcon.vue'

const router = useRouter()
const historyStore = useHistoryStore()
const i18nStore = useI18nStore()

const { historyByPage } = storeToRefs(historyStore)
const { t } = storeToRefs(i18nStore)

const getPageIcon = (page: string) => {
  const icons: Record<string, string> = {
    dictionary: 'menu_book',
    assistant: 'support_agent',
    editor: 'edit'
  }
  return icons[page] || 'help'
}

const navigateToHistoryItem = (item: any) => {
  const routes: Record<string, string> = {
    dictionary: '/dictionnaire',
    assistant: '/assistant',
    editor: '/editeur'
  }
  
  if (routes[item.page]) {
    router.push(routes[item.page])
  }
}

const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Maintenant'
  if (minutes < 60) return `${minutes}min`
  if (hours < 24) return `${hours}h`
  return `${days}j`
}

const removeHistoryItem = (id: string) => {
  historyStore.removeHistoryItem(id)
}

const clearPageHistory = (page: string) => {
  historyStore.clearPageHistory(page)
}

const clearAllHistory = () => {
  historyStore.clearAllHistory()
}
</script>

<style scoped>
.history-panel {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.history-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.history-actions {
  display: flex;
  gap: 0.5rem;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--error-color, #ef4444);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.clear-btn:hover {
  background-color: var(--error-color-dark, #dc2626);
  transform: translateY(-1px);
}

.history-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.no-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
  text-align: center;
  gap: 1rem;
}

.no-history p {
  font-size: 1.125rem;
  margin: 0;
}

.history-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.history-section {
  background-color: var(--bg-secondary);
  border-radius: 0.75rem;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  background: none;
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-page-btn:hover {
  background-color: var(--error-color, #ef4444);
  color: white;
}

.history-items {
  padding: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.history-item:hover {
  background-color: var(--bg-primary);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: var(--accent-primary);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-action {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-details {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.item-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  background: none;
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.6;
  font-size: 0.9rem;
}

.history-item:hover .item-remove {
  opacity: 1;
  background-color: rgba(239, 68, 68, 0.1);
}

.item-remove:hover {
  background-color: var(--error-color, #ef4444);
  color: white;
  transform: scale(1.1);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .history-header {
    padding: 1rem;
  }
  
  .history-title {
    font-size: 1.125rem;
  }
  
  .clear-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .history-content {
    padding: 0.75rem;
  }
  
  .history-sections {
    gap: 1.5rem;
  }
  
  .section-header {
    padding: 0.75rem 1rem;
  }
  
  .section-title {
    font-size: 0.9rem;
  }
  
  .history-item {
    padding: 0.5rem;
  }
  
  .item-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .item-action {
    font-size: 0.85rem;
  }
  
  .item-details {
    font-size: 0.75rem;
  }
  
  .item-time {
    font-size: 0.7rem;
  }
}
</style>
