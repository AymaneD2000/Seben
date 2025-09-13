<template>
  <div class="app-logo">
    <img 
      :src="logoSource" 
      alt="SEBEN" 
      :class="['logo-image', sizeClass]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
})

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const logoSource = computed(() => {
  return isDark.value 
    ? '/src/assets/seben-logo-white.svg' 
    : '/src/assets/seben-logo-new.svg'
})

const sizeClass = computed(() => {
  return `logo-${props.size}`
})
</script>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
}

.logo-image {
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-image:hover {
  transform: scale(1.05);
}

.logo-small {
  height: 1.5rem;
  width: auto;
}

.logo-medium {
  height: 2.5rem;
  width: auto;
}

.logo-large {
  height: 4rem;
  width: auto;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .logo-medium {
    height: 2rem;
  }
  
  .logo-large {
    height: 3rem;
  }
}
</style>
