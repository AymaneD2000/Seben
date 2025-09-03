<template>
  <aside class="dictionary-sidebar">
    <!-- Popular Words Section -->
    <div class="sidebar-section">
      <h3 class="section-title">Mots populaires</h3>
      <div class="word-list">
        <div class="word-item" @click="selectWord('nege')">
          <span class="word-name">Nege</span>
          <span class="word-category">Ferme</span>
        </div>
        <div class="word-item" @click="selectWord('dugukolo')">
          <span class="word-name">Dugukolo</span>
          <span class="word-category">Terre</span>
        </div>
        <div class="word-item" @click="selectWord('sene')">
          <span class="word-name">Sene</span>
          <span class="word-category">Agriculture</span>
        </div>
        <div class="word-item" @click="selectWord('foroba')">
          <span class="word-name">Foroba</span>
          <span class="word-category">Public</span>
        </div>
        <div class="word-item" @click="selectWord('dugu')">
          <span class="word-name">Dugu</span>
          <span class="word-category">Village</span>
        </div>
      </div>
    </div>

    <!-- Recently Consulted Section -->
    <div class="sidebar-section">
      <h3 class="section-title">Récemment consultés</h3>
      <div class="word-list">
        <div class="word-item recent" @click="selectWord('nege')">
          <span class="word-name">Nege</span>
          <span class="word-time">Il y a 2h</span>
        </div>
        <div class="word-item recent" @click="selectWord('dugukolo')">
          <span class="word-name">Dugukolo</span>
          <span class="word-time">Il y a 4h</span>
        </div>
        <div class="word-item recent" @click="selectWord('sene')">
          <span class="word-name">Sene</span>
          <span class="word-time">Il y a 5h</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  selectWord: [word: string]
}>()

const selectWord = (word: string) => {
  emit('selectWord', word)
}
</script>

<style scoped>
.dictionary-sidebar {
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

.sidebar-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.word-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.word-item:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-primary);
  transform: translateX(4px);
}

.word-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}

.word-category {
  font-size: 0.8rem;
  color: var(--text-muted);
  background-color: var(--bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.word-time {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.word-item.recent .word-category,
.word-item.recent .word-time {
  font-style: italic;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .dictionary-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
  }
  
  .sidebar-section {
    margin-bottom: 1.5rem;
  }
  
  .word-list {
    gap: 0.5rem;
  }
  
  .word-item {
    padding: 0.5rem 0.75rem;
  }
  
  .word-name {
    font-size: 0.9rem;
  }
  
  .word-category,
  .word-time {
    font-size: 0.75rem;
  }
}
</style>
