<template>
  <header class="app-header">
    <div class="container">
      <nav class="nav-container">
        <!-- Logo -->
        <AppLogo size="medium" />
        
        <!-- Navigation Links -->
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">
            <MaterialIcon name="home" size="medium" />
            {{ t.nav.home }}
          </RouterLink>
          <RouterLink to="/dictionnaire" class="nav-link">
            <MaterialIcon name="menu_book" size="medium" />
            {{ t.nav.dictionary }}
          </RouterLink>
          <RouterLink to="/assistant" class="nav-link">
            <MaterialIcon name="support_agent" size="medium" />
            {{ t.nav.assistant }}
          </RouterLink>
          <RouterLink to="/editeur" class="nav-link">
            <MaterialIcon name="edit" size="medium" />
            {{ t.nav.editor }}
          </RouterLink>
        </div>
        
        <!-- Right Side Actions -->
        <div class="nav-actions">
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

          <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Mode clair' : 'Mode sombre'">
            <MaterialIcon :name="isDark ? 'light_mode' : 'dark_mode'" size="medium" />
          </button>
          
          <!-- Authenticated User -->
          <div v-if="authStore.isAuthenticated" class="user-menu">
            <button class="user-profile" @click="toggleUserMenu">
              <img v-if="authStore.user?.avatar" :src="authStore.user.avatar" :alt="authStore.user.username" class="user-avatar" />
              <MaterialIcon v-else name="account_circle" size="medium" />
              <span class="user-name">{{ authStore.user?.username }}</span>
            </button>
            
            <div v-if="showUserMenu" class="user-dropdown">
              <div class="user-info">
                <p class="user-email">{{ authStore.user?.email }}</p>
                <p v-if="authStore.user?.phone" class="user-phone">{{ authStore.user.phone }}</p>
              </div>
              <button @click="handleLogout" class="logout-btn">
                <MaterialIcon name="logout" size="small" />
                {{ t.header.logout }}
              </button>
            </div>
          </div>
          
          <!-- Not Authenticated -->
          <div v-else class="auth-menu">
            <button class="auth-toggle" @click="toggleAuthMenu">
              <MaterialIcon name="account_circle" size="medium" />
              <span>{{ t.header.myAccount }}</span>
              <MaterialIcon name="keyboard_arrow_down" size="small" :class="{ 'rotated': showAuthMenu }" />
            </button>
            
            <div v-if="showAuthMenu" class="auth-dropdown">
              <RouterLink to="/login" class="auth-option" @click="closeAuthMenu">
                <MaterialIcon name="login" size="small" />
                <div class="auth-option-content">
                  <span class="auth-option-title">{{ t.header.login }}</span>
                  <span class="auth-option-subtitle">{{ t.auth.loginSubtitle }}</span>
                </div>
              </RouterLink>
              
              <RouterLink to="/register" class="auth-option" @click="closeAuthMenu">
                <MaterialIcon name="person_add" size="small" />
                <div class="auth-option-content">
                  <span class="auth-option-title">{{ t.header.register }}</span>
                  <span class="auth-option-subtitle">{{ t.auth.registerSubtitle }}</span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'
import AppLogo from './AppLogo.vue'
import MaterialIcon from './MaterialIcon.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const i18nStore = useI18nStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
const { t, currentLanguage, languages } = storeToRefs(i18nStore)

const showUserMenu = ref(false)
const showAuthMenu = ref(false)
const showLanguageMenu = ref(false)

// Language data is now managed by the i18n store

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showAuthMenu.value = false // Close auth menu if open
}

const toggleAuthMenu = () => {
  showAuthMenu.value = !showAuthMenu.value
  showUserMenu.value = false // Close user menu if open
  showLanguageMenu.value = false // Close language menu if open
}

const closeAuthMenu = () => {
  showAuthMenu.value = false
}

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
  showUserMenu.value = false // Close user menu if open
  showAuthMenu.value = false // Close auth menu if open
}

const selectLanguage = (language: any) => {
  i18nStore.setLanguage(language)
  showLanguageMenu.value = false
  console.log('Language changed to:', language.name)
}

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
}

// Close menus when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-menu') && !target.closest('.auth-menu') && !target.closest('.language-selector')) {
    showUserMenu.value = false
    showAuthMenu.value = false
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  authStore.checkAuthStatus()
  i18nStore.loadLanguage()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-header {
  background-color: var(--bg-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

/* Ombre différente selon le thème */
.light .app-header {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.dark .app-header {
  box-shadow: 0 8px 35px rgba(0, 0, 0, 0.3);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}


.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.nav-link.router-link-active {
  background-color: var(--accent-primary);
  color: white;
}

.nav-link.router-link-active .nav-icon {
  filter: brightness(1);
}

.nav-icon {
  margin-right: 0.5rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.nav-link:hover .nav-icon {
  color: var(--accent-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle,
.user-profile,
.auth-toggle,
.language-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
}

.language-selector {
  position: relative;
}

.language-toggle {
  min-width: 4rem;
  justify-content: space-between;
}

.language-code {
  font-weight: 600;
  font-size: 0.85rem;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
  margin-top: 0.5rem;
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
  flex: 1;
}

.language-native {
  font-size: 0.8rem;
  opacity: 0.7;
}

.auth-menu {
  position: relative;
}

.auth-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.auth-toggle:hover {
  background-color: var(--bg-tertiary);
}

.auth-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  z-index: 1000;
  overflow: hidden;
  margin-top: 0.5rem;
}

.auth-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.auth-option:last-child {
  border-bottom: none;
}

.auth-option:hover {
  background-color: var(--bg-secondary);
}

.auth-option-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.auth-option-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.auth-option-subtitle {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.rotated {
  transform: rotate(180deg);
}

.theme-toggle {
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
}

.theme-toggle:hover,
.user-profile:hover,
.login-btn:hover {
  background-color: var(--bg-tertiary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
}

.user-menu {
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 1000;
  margin-top: 0.5rem;
}

.user-info {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.user-email,
.user-phone {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.user-email {
  font-weight: 500;
  color: var(--text-primary);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  
  .nav-actions {
    gap: 0.5rem;
  }
  
  .theme-toggle,
  .user-profile,
  .auth-toggle,
  .language-toggle {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
  
  .auth-toggle span {
    display: none;
  }
  
  .language-toggle {
    min-width: 2rem;
    justify-content: center;
  }
  
  .language-code {
    display: none;
  }
  
  .auth-dropdown {
    right: -1rem;
    min-width: 260px;
  }
  
  .language-dropdown {
    right: -1rem;
    min-width: 180px;
  }
}
</style>
