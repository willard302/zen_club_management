<script setup lang="ts"></script>

<template>
  <div>
    <LayoutsHeader />
      <slot />
    <LayoutsFooter />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 30000;
}
</style>
