<template>
  <section class="quick-access-section">
    <div class="container">
      <h2 class="section-title">Accès rapide</h2>
      
      <div class="quick-access-grid">
        <div class="access-card" @click="navigateTo('dictionary')">
          <div class="access-icon">
            <div class="icon-bg">
              <MaterialIcon name="menu_book" size="large" color="var(--accent-primary)" />
            </div>
          </div>
          <h3 class="access-title">Dictionnaire</h3>
          <p class="access-description">Rechercher des mots</p>
        </div>
        
        <div class="access-card" @click="navigateTo('assistant')">
          <div class="access-icon">
            <div class="icon-bg">
              <MaterialIcon name="support_agent" size="large" color="var(--accent-primary)" />
            </div>
          </div>
          <h3 class="access-title">Assistant IA</h3>
          <p class="access-description">Poser des questions</p>
        </div>
        
        <div class="access-card" @click="navigateTo('editor')">
          <div class="access-icon">
            <div class="icon-bg">
              <MaterialIcon name="edit" size="large" color="var(--accent-primary)" />
            </div>
          </div>
          <h3 class="access-title">Éditeur</h3>
          <p class="access-description">Rédiger du texte</p>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MaterialIcon from './MaterialIcon.vue'

const router = useRouter()

const navigateTo = (section: string) => {
  if (section === 'dictionary') {
    router.push('/dictionnaire')
  } else if (section === 'assistant') {
    router.push('/assistant')
  } else if (section === 'editor') {
    router.push('/editeur')
  } else {
    // Other sections not implemented yet
    console.log(`Navigating to ${section} - Coming soon!`)
  }
}
</script>

<style scoped>
.quick-access-section {
  padding: 6rem 0;
  background-color: var(--bg-primary);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 4rem;
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.access-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.access-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border-color: var(--accent-primary);
}

.access-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.access-card:hover::before {
  opacity: 1;
}

.access-icon {
  margin-bottom: 1.5rem;
}

.icon-bg {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.access-card:hover .icon-bg {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  transform: scale(1.1) rotate(5deg);
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: brightness(0.9);
}

.access-card:hover .icon {
  transform: scale(1.2);
  filter: brightness(1);
}

.access-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.access-card:hover .access-title {
  color: var(--accent-primary);
}

.access-description {
  color: var(--text-secondary);
  font-size: 1rem;
  transition: color 0.3s ease;
}

.access-card:hover .access-description {
  color: var(--text-primary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .quick-access-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .quick-access-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .access-card {
    padding: 1.5rem;
  }
  
  .icon-bg {
    width: 80px;
    height: 80px;
  }
  
  .icon {
    width: 2rem;
    height: 2rem;
  }
  
  .access-title {
    font-size: 1.25rem;
  }
  
  .access-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .quick-access-grid {
    grid-template-columns: 1fr;
  }
  
  .access-card {
    padding: 1.25rem;
  }
  
  .icon-bg {
    width: 70px;
    height: 70px;
  }
  
  .icon {
    width: 1.8rem;
    height: 1.8rem;
  }
}
</style>
