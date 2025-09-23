<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <footer>
    <LayoutsTabBar v-if="authStore.isAuthenticated" />
  </footer>
</template>

<style scoped></style>
