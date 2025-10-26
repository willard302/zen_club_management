<script setup lang="ts">
const show = ref(false);
</script>

<template>
  <div>
    <van-sticky :offset-top="54">
      <!-- <van-calendar v-model:show="show" switch-mode="year-month" /> -->
       <van-button>test</van-button>
    </van-sticky>
    <van-calendar
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '700px' }"
      :show-title="false"
      :show-subtitle="false"
    />
  </div>
</template>

<style scoped></style>
