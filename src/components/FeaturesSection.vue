<template>
  <section class="features-section">
    <div class="container">
      <h2 class="section-title">Fonctionnalités principales</h2>
      
      <div class="features-grid">
        <!-- Row 1 -->
        <div class="feature-card">
          <div class="feature-icon">
            <MaterialIcon name="menu_book" size="large" color="var(--accent-primary)" />
          </div>
          <h3 class="feature-title">Dictionnaire intelligent</h3>
          <p class="feature-description">
            Accédez à un vaste dictionnaire avec définitions complètes et exemples d'utilisation pour toutes les langues nationales du Mali.
          </p>
        </div>
        
        
        <div class="feature-card">
          <div class="feature-icon">
            <MaterialIcon name="support_agent" size="large" color="var(--accent-primary)" />
          </div>
          <h3 class="feature-title">Assistant IA intégré</h3>
          <p class="feature-description">
            Posez vos questions sur la grammaire et la langue bambara et obtenez des réponses précises de notre assistant IA.
          </p>
        </div>
        
        <!-- Row 2 -->
        <div class="feature-card">
          <div class="feature-icon">
            <MaterialIcon name="edit" size="large" color="var(--accent-primary)" />
          </div>
          <h3 class="feature-title">Éditeur de texte</h3>
          <p class="feature-description">
            Rédigez et corrigez vos textes en bambara avec notre éditeur intelligent qui détecte et corrige les erreurs.
          </p>
        </div>
        
        
        <div class="feature-card">
          <div class="feature-icon">
            <MaterialIcon name="school" size="large" color="var(--accent-primary)" />
          </div>
          <h3 class="feature-title">Grammaire interactive</h3>
          <p class="feature-description">
            Apprenez les règles grammaticales avec des exemples pratiques et des exercices interactifs.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'
</script>

<style scoped>
.features-section {
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-primary);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  background-color: var(--accent-primary);
  transform: scale(1.1);
}

.icon-placeholder {
  font-size: 2rem;
  filter: grayscale(1);
  transition: filter 0.3s ease;
}

.feature-card:hover .icon-placeholder {
  filter: grayscale(0);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-title {
  color: var(--accent-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .features-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .icon-placeholder {
    font-size: 1.5rem;
  }
  
  .feature-title {
    font-size: 1.125rem;
  }
  
  .feature-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
