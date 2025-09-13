<template>
  <span 
    :class="['material-icons', `material-icons--${size}`, { 'material-icons--filled': filled }]"
    :style="{ color: color }"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  size?: 'small' | 'medium' | 'large'
  filled?: boolean
  color?: string
}>()
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  user-select: none;
  vertical-align: middle;
}

.material-icons--small {
  font-size: 18px;
}

.material-icons--medium {
  font-size: 24px;
}

.material-icons--large {
  font-size: 32px;
}

.material-icons--filled {
  font-variation-settings: 'FILL' 1;
}
</style>
