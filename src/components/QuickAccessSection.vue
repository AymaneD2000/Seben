<template>
  <section class="quick-access-section">
    <div class="container">
      <h2 class="section-title">Accès rapide</h2>
      
      <div class="quick-access-grid">
        <!-- Dictionnaire -->
        <div class="access-card" @click="navigateTo('dictionary')" data-tool="dictionary">
          <div class="card-header">
            <div class="tool-icon">
              <div class="icon-wrapper">
                <MaterialIcon name="menu_book" size="large" />
              </div>
              <div class="icon-pulse"></div>
            </div>
          </div>
          
          <div class="card-preview">
            <div class="preview-header">
              <div class="preview-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <div class="preview-title">Dictionnaire Bambara</div>
            </div>
            
            <div class="preview-content">
              <div class="search-interface">
                <div class="search-bar">
                  <div class="search-input">
                    <span class="input-text">nege</span>
                    <div class="search-icon">
                      <MaterialIcon name="search" size="small" />
                    </div>
                  </div>
                </div>
                
                <div class="search-results">
                  <div class="result-item">
                    <div class="word">nege</div>
                    <div class="pronunciation">/ne.ge/</div>
                    <div class="definition">Ferme, champ cultivé</div>
                    <div class="example">
                      <span class="example-text">N be nege ke</span>
                      <span class="example-translation">Je cultive le champ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Assistant IA -->
        <div class="access-card" @click="navigateTo('assistant')" data-tool="assistant">
          <div class="card-header">
            <div class="tool-icon">
              <div class="icon-wrapper">
                <MaterialIcon name="support_agent" size="large" />
              </div>
              <div class="icon-pulse"></div>
            </div>
          </div>
          
          <div class="card-preview">
            <div class="preview-header">
              <div class="preview-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <div class="preview-title">Chat Assistant</div>
            </div>
            
            <div class="preview-content">
              <div class="chat-interface">
                <div class="chat-messages">
                  <div class="message user-message">
                    <div class="message-avatar">
                      <MaterialIcon name="person" size="small" />
                    </div>
                    <div class="message-content">
                      <div class="message-text">Comment dire "merci" ?</div>
                      <div class="message-time">14:32</div>
                    </div>
                  </div>
                  
                  <div class="message assistant-message">
                    <div class="message-avatar">
                      <MaterialIcon name="smart_toy" size="small" />
                    </div>
                    <div class="message-content">
                      <div class="message-text">"A ni ce" ou "I ni ce"</div>
                      <div class="message-time">14:32</div>
                    </div>
                  </div>
                </div>
                
                <div class="chat-input">
                  <div class="input-placeholder">Tapez votre question...</div>
                  <div class="send-button">
                    <MaterialIcon name="send" size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Éditeur -->
        <div class="access-card" @click="navigateTo('editor')" data-tool="editor">
          <div class="card-header">
            <div class="tool-icon">
              <div class="icon-wrapper">
                <MaterialIcon name="edit" size="large" />
              </div>
              <div class="icon-pulse"></div>
            </div>
          </div>
          
          <div class="card-preview">
            <div class="preview-header">
              <div class="preview-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <div class="preview-title">Éditeur de texte</div>
            </div>
            
            <div class="preview-content">
              <div class="editor-interface">
                <div class="editor-toolbar">
                  <div class="toolbar-item">
                    <MaterialIcon name="format_bold" size="small" />
                  </div>
                  <div class="toolbar-item">
                    <MaterialIcon name="format_italic" size="small" />
                  </div>
                  <div class="toolbar-item">
                    <MaterialIcon name="spellcheck" size="small" />
                  </div>
                </div>
                
                <div class="editor-content">
                  <div class="editor-line">
                    <span class="line-number">1</span>
                    <span class="line-text">N be <span class="highlight">bambara</span> kalan</span>
                  </div>
                  <div class="editor-line">
                    <span class="line-number">2</span>
                    <span class="line-text">Je <span class="highlight">apprends</span> le bambara</span>
                  </div>
                  <div class="editor-line">
                    <span class="line-number">3</span>
                    <span class="line-text">A ni ce!</span>
                  </div>
                </div>
                
                <div class="suggestion-panel">
                  <div class="suggestion-item">
                    <MaterialIcon name="lightbulb" size="small" />
                    <span class="suggestion-text">"kalan" = apprendre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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
  padding: 8rem 0;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  position: relative;
  overflow: hidden;
}

.quick-access-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 80% 20%, rgba(18, 84, 161, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(30, 107, 199, 0.08) 0%, transparent 50%);
  pointer-events: none;
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
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.access-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2rem;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.access-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(18, 84, 161, 0.05), rgba(30, 107, 199, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.access-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
  border-color: rgba(18, 84, 161, 0.3);
}

.access-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.tool-icon {
  position: relative;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
}

.icon-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(18, 84, 161, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.4s ease;
}

.access-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.access-card:hover .icon-pulse {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.3);
}



.card-preview {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
}

.dot:nth-child(1) { background: #ff5f57; }
.dot:nth-child(2) { background: #ffbd2e; }
.dot:nth-child(3) { background: #28ca42; }

.preview-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.preview-content {
  position: relative;
}

/* Search Interface Styles */
.search-interface {
  font-size: 0.8rem;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
}

.input-text {
  flex: 1;
  color: var(--text-primary);
  font-weight: 600;
}

.search-icon {
  color: var(--accent-primary);
}

.search-results {
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  padding: 1rem;
}

.result-item {
  color: var(--text-primary);
}

.word {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 0.25rem;
}

.pronunciation {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.definition {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.example {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
}

.example-text {
  color: var(--text-primary);
  font-weight: 500;
}

.example-translation {
  color: var(--text-secondary);
  font-style: italic;
}

/* Chat Interface Styles */
.chat-interface {
  font-size: 0.8rem;
}

.chat-messages {
  margin-bottom: 1rem;
  max-height: 120px;
  overflow-y: auto;
}

.message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.message-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: var(--accent-primary);
  color: white;
}

.assistant-message .message-avatar {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-text {
  background: var(--bg-primary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.user-message .message-text {
  background: var(--accent-primary);
  color: white;
}

.message-time {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.chat-input {
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
}

.input-placeholder {
  flex: 1;
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.send-button {
  color: var(--accent-primary);
  cursor: pointer;
}

/* Editor Interface Styles */
.editor-interface {
  font-size: 0.8rem;
}

.editor-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toolbar-item {
  width: 28px;
  height: 28px;
  border-radius: 0.5rem;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-item:hover {
  background: var(--accent-primary);
  color: white;
}

.editor-content {
  background: var(--bg-primary);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.editor-line {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.line-number {
  color: var(--text-secondary);
  font-size: 0.7rem;
  width: 20px;
  flex-shrink: 0;
  text-align: right;
}

.line-text {
  color: var(--text-primary);
  flex: 1;
}

.highlight {
  background: rgba(18, 84, 161, 0.2);
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
  color: var(--accent-primary);
}

.suggestion-panel {
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  padding: 0.75rem;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.suggestion-item .material-icons {
  color: #ffbd2e;
  font-size: 0.875rem;
}


/* Mobile Responsive */
@media (max-width: 1024px) {
  .quick-access-grid {
    gap: 2rem;
  }
  
  .access-card {
    padding: 1.5rem;
    min-height: 450px;
  }
}

@media (max-width: 768px) {
  .quick-access-section {
    padding: 6rem 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .quick-access-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .access-card {
    min-height: 400px;
  }
  
  .icon-wrapper {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .access-card {
    padding: 1.25rem;
    min-height: 350px;
  }
  
}
</style>