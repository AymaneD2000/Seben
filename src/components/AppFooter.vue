<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section">
          <h3 class="footer-title">SεBεN!</h3>
        </div>
        
        <!-- Functionalities -->
        <div class="footer-section">
          <h4 class="footer-heading">{{ t.footer.functionalities }}</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">{{ t.footer.links.dictionary }}</a></li>
            <li><a href="#" class="footer-link">{{ t.footer.links.grammar }}</a></li>
            <li><a href="#" class="footer-link">{{ t.footer.links.assistant }}</a></li>
            <li><a href="#" class="footer-link">{{ t.footer.links.editor }}</a></li>
          </ul>
        </div>
        
        <!-- Contact & Help -->
        <div class="footer-section">
          <h4 class="footer-heading">Contact & Aide</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Contact</a></li>
            <li><a href="#" class="footer-link">Aide</a></li>
            <li><a href="#" class="footer-link">Model Suite</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-bottom-content">
          <p class="copyright">
            {{ t.footer.copyright }}
          </p>
          <div class="social-links">
            <a href="#" class="social-link" title="Facebook">
              <MaterialIcon name="facebook" size="small" />
            </a>
            <a href="#" class="social-link" title="Twitter">
              <MaterialIcon name="alternate_email" size="small" />
            </a>
            <a href="#" class="social-link" title="LinkedIn">
              <MaterialIcon name="work" size="small" />
            </a>
            <a href="#" class="social-link" title="YouTube">
              <MaterialIcon name="play_circle" size="small" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'

const i18nStore = useI18nStore()
const { t } = storeToRefs(i18nStore)
</script>

<style scoped>
.app-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 2rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section {
  color: var(--text-secondary);
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.footer-description {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 300px;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-link:hover {
  color: var(--accent-primary);
}

.footer-divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  margin: 2rem 0 1.5rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--bg-tertiary);
  border-radius: 50%;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .app-footer {
    padding: 2rem 0 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .footer-description {
    max-width: none;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .social-link {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-title {
    font-size: 1.25rem;
  }
  
  .footer-heading {
    font-size: 1rem;
  }
  
  .footer-link {
    font-size: 0.9rem;
  }
  
  .copyright {
    font-size: 0.8rem;
  }
}
</style>
