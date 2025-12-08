<script setup lang="ts">
const router = useRouter();
const lists = reactive([
  { title: 'Member.list', path: '/members/memberList' },
  { title: 'Member.tracker', path: '/members/memberTracker' }
]);
</script>

<template>
  <van-cell-group class="profile__content" inset>
    <van-cell 
      v-for="(item, idx) in lists" 
      :key="idx" 
      is-link 
      :title="$t(item.title)"
      @click="router.push(item.path)"
    />
  </van-cell-group>
</template>

<style scoped lang="scss"></style>
