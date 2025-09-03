<template>
  <header class="app-header">
    <div class="container">
      <nav class="nav-container">
        <!-- Logo -->
        <div class="logo">
          <h1>SEBEN !</h1>
        </div>
        
        <!-- Navigation Links -->
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">
            <img src="@/assets/home_icon.png" alt="Accueil" class="nav-icon" />
            Accueil
          </RouterLink>
          <RouterLink to="/dictionnaire" class="nav-link">
            <img src="@/assets/dictionnaire_icon.png" alt="Dictionnaire" class="nav-icon" />
            Dictionnaire
          </RouterLink>
          <RouterLink to="/assistant" class="nav-link">
            <img src="@/assets/assistant_icon.png" alt="Assistant" class="nav-icon" />
            Assistant
          </RouterLink>
          <RouterLink to="/editeur" class="nav-link">
            <img src="@/assets/editeur_icon.png" alt="Éditeur" class="nav-icon" />
            Éditeur
          </RouterLink>
          <RouterLink to="/traduction" class="nav-link">
            <img src="@/assets/tradiction_icon.png" alt="Traduction" class="nav-icon" />
            Traduction
          </RouterLink>
        </div>
        
        <!-- Right Side Actions -->
        <div class="nav-actions">
          <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Mode clair' : 'Mode sombre'">
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
          <button class="user-profile">
            <span class="user-icon">👤</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<style scoped>
.app-header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
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
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.nav-link:hover .nav-icon {
  filter: brightness(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle,
.user-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.theme-toggle:hover,
.user-profile:hover {
  background-color: var(--bg-tertiary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .logo h1 {
    font-size: 1.2rem;
  }
  
  .nav-actions {
    gap: 0.5rem;
  }
  
  .theme-toggle,
  .user-profile {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
}
</style>
