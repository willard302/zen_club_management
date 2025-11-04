<script setup lang="ts">
const mainStore = useMainStore();
</script>

<template>
  <footer>
    <LayoutTabBar v-if="mainStore.isAuthenticated === true" />
  </footer>
</template>

<style scoped></style>
