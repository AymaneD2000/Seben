<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            {{ t.hero.title }}
          </h1>
          <p class="hero-subtitle">
            {{ t.hero.subtitle }}
          </p>
          
          <!-- Search Bar -->
          <div class="search-container">
            <div class="search-bar">
              <input 
                type="text" 
                :placeholder="t.hero.searchPlaceholder"
                v-model="searchQuery"
                class="search-input"
              />
              <button class="voice-button" title="Recherche vocale">
                <MaterialIcon name="mic" size="medium" />
              </button>
              <button class="search-button" @click="performSearch">
                <MaterialIcon name="search" size="medium" />
              </button>
            </div>
          </div>
          
          <!-- Statistics -->
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">{{ t.hero.stats.words }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">{{ t.hero.stats.phrases }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15</div>
              <div class="stat-label">{{ t.hero.stats.languages }}</div>
            </div>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div class="hero-image">
          <img src="@/assets/side_image.png" alt="Traditional Mali Art" class="side-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from './AppLogo.vue'
import MaterialIcon from './MaterialIcon.vue'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'

const i18nStore = useI18nStore()
const { t } = storeToRefs(i18nStore)

const searchQuery = ref('')

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search functionality
    console.log('Searching for:', searchQuery.value)
  }
}
</script>

<style scoped>
.hero-section {
  padding: 4rem 0 6rem;
  background-color: var(--bg-primary);
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}


.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.highlight {
  color: var(--text-secondary);
  font-weight: 400;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.search-container {
  margin-bottom: 3rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 3rem;
  padding: 0.75rem 1.5rem;
  gap: 1rem;
  transition: border-color 0.3s ease;
}

.search-bar:focus-within {
  border-color: var(--accent-primary);
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 1rem;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.voice-button,
.search-button {
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

.voice-button:hover,
.search-button:hover {
  background-color: var(--bg-tertiary);
}

.button-icon {
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
  filter: brightness(0.8);
  transition: filter 0.3s ease;
}

.voice-button:hover .button-icon,
.search-button:hover .button-icon {
  filter: brightness(1);
}

.stats-container {
  display: flex;
  gap: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Hero Image Styling */
.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.side-image {
  max-width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.side-image:hover {
  transform: scale(1.02);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .stats-container {
    justify-content: center;
    gap: 2rem;
  }
  
  .side-image {
    max-height: 350px;
  }
}
</style>
