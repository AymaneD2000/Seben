<template>
  <aside class="app-sidebar">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <AppLogo size="medium" />
      </div>
      <div class="header-actions">
        <!-- Theme Toggle -->
        <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Mode clair' : 'Mode sombre'">
          <MaterialIcon :name="isDark ? 'light_mode' : 'dark_mode'" size="small" />
        </button>
        
        <!-- Language Selector -->
        <div class="language-selector">
          <button class="language-toggle" @click="toggleLanguageMenu">
            <span class="language-code">{{ currentLanguage.code }}</span>
            <MaterialIcon name="keyboard_arrow_down" size="small" :class="{ 'rotated': showLanguageMenu }" />
          </button>
          
          <div v-if="showLanguageMenu" class="language-dropdown">
            <button 
              v-for="lang in languages" 
              :key="lang.code"
              @click="selectLanguage(lang)"
              class="language-option"
              :class="{ 'active': currentLanguage.code === lang.code }"
            >
              <span class="language-flag">{{ lang.flag }}</span>
              <span class="language-name">{{ lang.name }}</span>
              <span class="language-native">{{ lang.native }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 class="nav-section-title" v-if="!isCollapsed">{{ t.nav.main }}</h3>
        <ul class="nav-list">
          <li>
            <RouterLink to="/" class="nav-item" :class="{ 'active': $route.path === '/' }">
              <MaterialIcon name="home" size="medium" />
              <span v-if="!isCollapsed">{{ t.nav.home }}</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dictionnaire" class="nav-item" :class="{ 'active': $route.path === '/dictionnaire' }">
              <MaterialIcon name="menu_book" size="medium" />
              <span v-if="!isCollapsed">{{ t.nav.dictionary }}</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/assistant" class="nav-item" :class="{ 'active': $route.path === '/assistant' }">
              <MaterialIcon name="support_agent" size="medium" />
              <span v-if="!isCollapsed">{{ t.nav.assistant }}</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/editeur" class="nav-item" :class="{ 'active': $route.path === '/editeur' }">
              <MaterialIcon name="edit" size="medium" />
              <span v-if="!isCollapsed">{{ t.nav.editor }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- User Section -->
      <div class="nav-section">
        <h3 class="nav-section-title" v-if="!isCollapsed">{{ t.nav.account }}</h3>
        <ul class="nav-list">
          <li v-if="authStore.isAuthenticated">
            <div class="user-profile">
              <div class="user-avatar">
                <MaterialIcon name="account_circle" size="medium" />
              </div>
              <div v-if="!isCollapsed" class="user-info">
                <span class="user-name">{{ authStore.user?.username }}</span>
                <span class="user-email">{{ authStore.user?.email }}</span>
              </div>
            </div>
          </li>
          <li v-if="!authStore.isAuthenticated">
            <RouterLink to="/login" class="nav-item">
              <MaterialIcon name="person" size="medium" />
              <span v-if="!isCollapsed">Profil</span>
            </RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated">
            <button @click="handleLogout" class="nav-item logout-btn">
              <MaterialIcon name="logout" size="medium" />
              <span v-if="!isCollapsed">{{ t.header.logout }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- History Section -->
      <div class="nav-section">
        <h3 class="nav-section-title" v-if="!isCollapsed">{{ t.history.title }}</h3>
        <div class="history-container">
          <div v-if="recentHistory.length === 0" class="no-history">
            <MaterialIcon name="history" size="small" />
            <span v-if="!isCollapsed">{{ t.history.noHistory }}</span>
          </div>
          <div v-else class="history-list">
            <div 
              v-for="item in recentHistory.slice(0, 5)" 
              :key="item.id"
              class="history-item"
              :class="{ 
                'selected': selectedHistoryItems.includes(item.id),
                'selection-mode': isSelectionMode 
              }"
              @click="isSelectionMode ? toggleItemSelection(item.id) : navigateToHistoryItem(item)"
            >
              <div class="history-icon">
                <MaterialIcon :name="item.icon" size="small" />
              </div>
              <div v-if="!isCollapsed" class="history-content">
                <div class="history-action">{{ item.action }}</div>
                <div class="history-page">{{ t.history.pages[item.page] }}</div>
                <div class="history-time">{{ formatTime(item.timestamp) }}</div>
              </div>
              <button 
                v-if="!isCollapsed"
                @click.stop="removeHistoryItem(item.id)"
                class="history-remove"
                :title="t.history.removeItem"
              >
                <MaterialIcon name="close" size="small" />
              </button>
            </div>
          </div>
          <div v-if="recentHistory.length > 0 && !isCollapsed" class="history-actions">
            <div class="history-info">
              <MaterialIcon name="info" size="small" />
              <span v-if="!isSelectionMode">Survolez un élément pour le supprimer</span>
              <span v-else>{{ selectedHistoryItems.length }} élément(s) sélectionné(s)</span>
            </div>
            <div class="history-buttons">
              <button 
                @click="toggleSelectionMode" 
                class="selection-btn"
                :class="{ active: isSelectionMode }"
              >
                <MaterialIcon :name="isSelectionMode ? 'close' : 'checklist'" size="small" />
                {{ isSelectionMode ? 'Annuler' : 'Sélectionner' }}
              </button>
              <button 
                v-if="isSelectionMode && selectedHistoryItems.length > 0"
                @click="deleteSelectedItems" 
                class="delete-selected-btn"
              >
                <MaterialIcon name="delete" size="small" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useI18nStore } from '@/stores/i18n'
import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
import AppLogo from './AppLogo.vue'
import MaterialIcon from './MaterialIcon.vue'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const i18nStore = useI18nStore()
const historyStore = useHistoryStore()

const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
const { t, currentLanguage, languages } = storeToRefs(i18nStore)
const { recentHistory, removeHistoryItem, clearAllHistory } = storeToRefs(historyStore)

const showLanguageMenu = ref(false)
const selectedHistoryItems = ref<string[]>([])
const isSelectionMode = ref(false)

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
}

const selectLanguage = (language: any) => {
  i18nStore.setLanguage(language)
  showLanguageMenu.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

// History functions
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

// Fonctions de sélection multiple
const toggleSelectionMode = () => {
  isSelectionMode.value = !isSelectionMode.value
  if (!isSelectionMode.value) {
    selectedHistoryItems.value = []
  }
}

const toggleItemSelection = (itemId: string) => {
  const index = selectedHistoryItems.value.indexOf(itemId)
  if (index > -1) {
    selectedHistoryItems.value.splice(index, 1)
  } else {
    selectedHistoryItems.value.push(itemId)
  }
}

const deleteSelectedItems = () => {
  if (selectedHistoryItems.value.length === 0) return
  
  const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedHistoryItems.value.length} élément(s) de l'historique ?`)
  if (!confirmed) return
  
  selectedHistoryItems.value.forEach(id => {
    historyStore.removeHistoryItem(id, true) // true = pas de confirmation
  })
  
  selectedHistoryItems.value = []
  isSelectionMode.value = false
}

// Sidebar is now fixed - no state to load

// Close language menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-selector')) {
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ===== BASE SIDEBAR STYLES ===== */
.app-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: visible;
}

/* ===== HEADER LAYOUT ===== */
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
  min-height: 80px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  min-width: 0;
  position: relative;
  left: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-left: auto;
  overflow: visible;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--bg-secondary);
  border: none;
  border-radius: 0.5rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.theme-toggle:hover {
  background-color: var(--bg-tertiary);
  color: var(--accent-primary);
}

.language-selector {
  position: relative;
}

.language-toggle {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: var(--bg-secondary);
  border: none;
  border-radius: 0.5rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 600;
}

.language-toggle:hover {
  background-color: var(--bg-tertiary);
}

.language-code {
  font-weight: 600;
  font-size: 0.8rem;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-top: 0.25rem;
  min-width: 150px;
  z-index: 9999;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
  font-size: 0.85rem;
}

.language-option:hover {
  background-color: var(--bg-secondary);
}

.language-option.active {
  background-color: var(--accent-primary);
  color: white;
}

.language-flag {
  font-size: 1rem;
}

.language-name {
  font-weight: 500;
  flex: 1;
}

.language-native {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* Collapse button removed */

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
}

.nav-section {
  padding: 0 1rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  padding: 0 1rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-item:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.nav-item.active {
  background-color: var(--accent-primary);
  color: white;
}

.nav-item.active:hover {
  background-color: var(--accent-secondary);
}

.logout-btn {
  color: #ef4444;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--accent-primary);
  border-radius: 50%;
  color: white;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.user-email {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.language-selector {
  position: relative;
}

.language-btn {
  justify-content: space-between;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-top: 0.25rem;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
  font-size: 0.9rem;
}

.language-option:hover {
  background-color: var(--bg-secondary);
}

.language-option.active {
  background-color: var(--accent-primary);
  color: white;
}

.language-flag {
  font-size: 1.2rem;
}

.language-name {
  font-weight: 500;
}

/* ===== FIXED SIDEBAR - NO COLLAPSE ===== */

/* ===== HISTORY STYLES ===== */
.history-container {
  padding: 0 1rem;
}

.no-history {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
  justify-content: center;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.history-item:hover {
  background-color: var(--bg-secondary);
}

.history-item.selection-mode {
  cursor: pointer;
}

.history-item.selected {
  background-color: rgba(59, 130, 246, 0.1);
  border: 1px solid var(--accent-primary);
}

.history-item.selected .history-icon {
  background-color: var(--accent-primary);
}

.history-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--accent-primary);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.history-content {
  flex: 1;
  min-width: 0;
}

.history-action {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-page {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}

.history-time {
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}

.history-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.6;
  font-size: 0.8rem;
}

.history-item:hover .history-remove {
  opacity: 1;
  background-color: rgba(239, 68, 68, 0.1);
}

.history-remove:hover {
  background-color: var(--error-color, #ef4444);
  color: white;
  transform: scale(1.1);
}

.history-actions {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  padding: 0.5rem;
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  text-align: center;
  justify-content: center;
}

.history-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.selection-btn,
.delete-selected-btn,
.clear-all-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.selection-btn:hover {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.selection-btn.active {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.delete-selected-btn:hover {
  background-color: var(--error-color, #ef4444);
  color: white;
  border-color: var(--error-color, #ef4444);
}

.clear-all-btn:hover {
  background-color: var(--error-color, #ef4444);
  color: white;
  border-color: var(--error-color, #ef4444);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .app-sidebar {
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    height: 100vh !important;
  }
  
  .app-sidebar.open {
    transform: translateX(0);
  }
  
  .app-sidebar.collapsed {
    width: 100%;
    height: 100vh !important;
  }
}
</style>
