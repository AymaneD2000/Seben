<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <AppSidebar />
    
    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
  background-color: var(--bg-primary);
}

/* Content wrapper styles removed - each view handles its own layout */

/* Dictionary specific adjustments - same margin for both states */
:global(.app-sidebar.collapsed) ~ .main-content .dictionary-layout {
  margin-left: 280px;
}

:global(.app-sidebar.collapsed) ~ .main-content .dictionary-sidebar {
  left: 280px;
}

/* Assistant specific adjustments - same margin for both states */
:global(.app-sidebar.collapsed) ~ .main-content .assistant-layout {
  margin-left: 280px;
}


/* Editor specific adjustments - same margin for both states */
:global(.app-sidebar.collapsed) ~ .main-content .editor-layout {
  margin-left: 280px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  /* Content wrapper styles removed */
}
</style>
