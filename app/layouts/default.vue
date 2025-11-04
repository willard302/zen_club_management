<script setup lang="ts"></script>
<template>
  <ClientOnly>
    <div>
      <LayoutHeader />
      <main>
        <slot />
      </main>
      <LayoutFooter />
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