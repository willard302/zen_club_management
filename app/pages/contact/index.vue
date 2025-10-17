<script setup lang="ts">
definePageMeta({title: "contact_list"});
// import Friends from './components/Friends.vue';
// import Chats from './chats/index.vue';
const items = reactive([
  {name: 'friends'},
  {name: 'messages'}
]);
const active = ref("friends");
const handleToggle = (item: string) => {
  active.value = item
}
</script>

<template>
  <div>
    <van-space class="activity__class">
      <van-button
       v-for="(item, idx) in items"
       :key="idx"
       :class="{'current': active === item.name}"
       @click="handleToggle(item.name)"
      >
        {{ $t(item.name) }}
      </van-button>
    </van-space>
    <div class="activity__body">
      <!-- <Friends v-show="active === 'friends'" /> -->
      <!-- <Chats v-show="active === 'messages'" /> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
  .van-space {
    width: 100%;
    padding: 3% 10px;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    border-bottom: 1px solid #f2f3f5;
  }
  :deep(.van-space-item) {
    flex: 1;

    img {
      width: 80px;

      @include PhoneL {
        width: 64px;
      }
    }

    .van-button {
      width: 100%;

      &.current {
        outline: 1px solid #1989fa;
        color: #1989fa;
      }
    }
  }

  .activity__body {
    height: 70vh;
    overflow-y: scroll;
  }
</style>