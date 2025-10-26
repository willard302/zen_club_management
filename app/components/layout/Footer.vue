<script setup lang="ts">
const mainStore = useMainStore();
</script>

<template>
  <footer>
    <LayoutTabBar v-if="mainStore.isAuthenticated" />
  </footer>
</template>

<style scoped></style>
