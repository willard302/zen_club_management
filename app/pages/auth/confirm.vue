<script setup lang="ts">
const user = useSupabaseClient();

watch(user, () => {
  if (user) {
    return navigateTo('/home')
  }
}, {immediate: true})
</script>

<template>
  <div>Waiting for login...</div>
</template>

<style scoped></style>
