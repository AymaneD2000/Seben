import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true) // Start with dark mode as shown in design
  
  const theme = computed(() => isDark.value ? 'dark' : 'light')
  
  function toggleTheme() {
    isDark.value = !isDark.value
    updateDocumentTheme()
  }
  
  function setTheme(newTheme: 'dark' | 'light') {
    isDark.value = newTheme === 'dark'
    updateDocumentTheme()
  }
  
  function updateDocumentTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }
  
  // Initialize theme on store creation
  updateDocumentTheme()
  
  return { isDark, theme, toggleTheme, setTheme }
})
