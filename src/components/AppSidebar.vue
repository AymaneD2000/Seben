<template>
  <aside class="app-sidebar">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <AppLogo size="medium" />
      </div>
      <div class="header-actions">
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
          <li v-if="authStore.isAuthenticated">
            <button @click="handleLogout" class="nav-item logout-btn">
              <MaterialIcon name="logout" size="medium" />
              <span v-if="!isCollapsed">{{ t.header.logout }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Settings Section -->
      <div class="nav-section">
        <h3 class="nav-section-title" v-if="!isCollapsed">{{ t.nav.settings }}</h3>
        <ul class="nav-list">
          <li>
            <button @click="toggleTheme" class="nav-item">
              <MaterialIcon :name="isDark ? 'light_mode' : 'dark_mode'" size="medium" />
              <span v-if="!isCollapsed">{{ isDark ? t.nav.lightMode : t.nav.darkMode }}</span>
            </button>
          </li>
        </ul>
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
import { storeToRefs } from 'pinia'
import AppLogo from './AppLogo.vue'
import MaterialIcon from './MaterialIcon.vue'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const i18nStore = useI18nStore()

const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
const { t, currentLanguage, languages } = storeToRefs(i18nStore)

const showLanguageMenu = ref(false)

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
  left: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-top: 0.25rem;
  min-width: 150px;
  z-index: 1000;
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
