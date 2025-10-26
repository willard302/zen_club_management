<script setup lang="ts">
const route = useRoute();
const title = computed(() => {
  return route.meta.title ? route.meta.title : 'zen_club';
});
const routeBack = () => history.go(-1);
</script>

<template>
  <header>
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" @click="routeBack" />
      </template>
      <template #title>
        <NuxtLink class="title">{{ $t(title) }}</NuxtLink>
      </template>
      <template #right>
        <LocaleBar />
      </template>
    </van-nav-bar>
  </header>
</template>

<style scoped></style>
