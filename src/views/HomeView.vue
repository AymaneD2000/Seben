<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import QuickAccessSection from '@/components/QuickAccessSection.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="home-view">
    <AppHeader />
    <main>
      <HeroSection />
      <FeaturesSection />
      <QuickAccessSection />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background-color: var(--bg-primary);
}
</style>
