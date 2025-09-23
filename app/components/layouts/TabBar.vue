<script setup lang="ts">
const authStore = useAuthStore();
const home = { label: 'home', path: '/', icon: ['fas', 'house'] };
const newFriends = { label: 'newFriends', path: '/newFriends', icon: ['fas', 'magnifying-glass'] };
const contact = { label: 'contact', path: '/contact', icon: ['fab', 'rocketchat'] };
const profile = { label: 'profile', path: '/profile', icon: ['fas', 'user'] };

interface navItems {
  label: string,
  path: string,
  icon: string[]
};
const navItems: navItems[] = [home, newFriends, contact, profile];

</script>

<template>
  <van-tabbar v-model="authStore.tabBarActive">
    <van-tabbar-item
      v-for="(navItem, navIdx) in navItems"
      :key="navIdx"
      :name="navItem.label"
      :to="navItem.path"
    >
      <font-awesome :icon="navItem.icon" />
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="scss">
svg {
  font-size: 1.4rem;
}

.current svg {
  color: #1989FA;
}
</style>
