<script setup lang="ts">
import type { navItem } from '~/types/data.types';
const mainStore = useMainStore();
const home = { label: 'home', path: '/home', icon: ['fas', 'house'] };
const members = { label: 'members', path: '/members', icon: ['fas', 'id-card'] };
const finance = { label: 'finance', path: '/finance', icon: ['fas', 'money-check-dollar'] };
const profile = { label: 'profile', path: '/profile', icon: ['fas', 'user'] };

const navItems: navItem[] = [home, members, finance, profile];

</script>

<template>
  <client-only>
    <van-tabbar v-model="mainStore.tabBarActive">
      <van-tabbar-item
        v-for="(navItem, navIdx) in navItems"
        :key="navIdx"
        :name="navItem.label"
        :to="navItem.path"
      >
        <font-awesome :icon="navItem.icon" />
      </van-tabbar-item>
    </van-tabbar>
  </client-only>
</template>

<style scoped lang="scss">
svg {
  font-size: 1.4rem;
}

.current svg {
  color: #1989FA;
}
</style>
