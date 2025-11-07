<script setup lang="ts">
const mainStore = useMainStore()
</script>
<template>
  <ClientOnly>
    <div>
      <LayoutHeader />
      <main>
        <slot />
      </main>
      <LayoutFooter v-if="mainStore.showTabbar" />
    </div>
  </ClientOnly>
</template>
<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 30000;
}
main {
  margin-top: 46px;
}
</style>