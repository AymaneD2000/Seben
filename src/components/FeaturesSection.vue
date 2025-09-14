<template>
  <section class="features-section">
    <div class="container">
      <h2 class="section-title">Fonctionnalités principales</h2>
      
      <div class="features-grid">
        <!-- Dictionnaire -->
        <div class="feature-card">
          <div class="feature-image-container">
            <div class="image-wrapper">
              <img src="@/assets/dictionnaire.png" alt="Dictionnaire" class="feature-image" />
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Dictionnaire intelligent</h3>
            <p class="feature-description">
              Accédez à un vaste dictionnaire avec définitions complètes et exemples d'utilisation pour toutes les langues nationales du Mali.
            </p>
          </div>
        </div>
        
        <!-- Assistant IA -->
        <div class="feature-card">
          <div class="feature-image-container">
            <div class="image-wrapper">
              <img src="@/assets/assistant.png" alt="Assistant IA" class="feature-image" />
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Assistant IA intégré</h3>
            <p class="feature-description">
              Posez vos questions sur la grammaire et la langue bambara et obtenez des réponses précises de notre assistant IA.
            </p>
          </div>
        </div>
        
        <!-- Éditeur -->
        <div class="feature-card">
          <div class="feature-image-container">
            <div class="image-wrapper">
              <img src="@/assets/editeur.png" alt="Éditeur" class="feature-image" />
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Éditeur de texte</h3>
            <p class="feature-description">
              Rédigez et corrigez vos textes en bambara avec notre éditeur intelligent qui détecte et corrige les erreurs.
            </p>
          </div>
        </div>
        
        <!-- Bɛɛ ka jeliba -->
        <div class="feature-card">
          <div class="feature-image-container">
            <div class="image-wrapper">
              <img src="@/assets/Bɛɛ ka jeliba.png" alt="Bɛɛ ka jeliba" class="feature-image" />
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Bɛɛ ka jeliba</h3>
            <p class="feature-description">
              Générez des histoires personnalisées à partir d'éléments clés et créez des récits captivants en bambara.
            </p>
          </div>
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
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-image-container {
  margin-bottom: 2rem;
  position: relative;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  height: 150px;
  transition: all 0.3s ease;
}

.feature-card:hover .image-wrapper {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(18, 84, 161, 0.2);
}

.feature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-image {
  filter: brightness(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(18, 84, 161, 0.1), rgba(30, 107, 199, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.feature-card:hover .image-overlay {
  opacity: 1;
}

.feature-content {
  position: relative;
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
@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
  
  .image-wrapper {
    width: 130px;
    height: 130px;
  }
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  .image-wrapper {
    width: 130px;
    height: 130px;
  }
}

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
    gap: 3rem;
  }
  
  .image-wrapper {
    width: 120px;
    height: 120px;
  }
  
  .feature-title {
    font-size: 1.25rem;
  }
  
  .feature-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .image-wrapper {
    width: 100px;
    height: 100px;
  }
}
</style>
