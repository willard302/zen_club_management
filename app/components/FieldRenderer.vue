<script setup lang="ts">
import type { FieldItem } from '~/types/data.types';

const props = defineProps<{field: FieldItem}>();
const emit = defineEmits(['update:value']);
const getComponentType = (field: FieldItem) => {
  switch (field.type) {
    case 'text':
    case 'number':
      return 'van-field'; // 文字或數字欄位
    case 'checkbox':
      return 'van-switch'; // 開關
    // case 'select':
    //   return 'van-picker'; // 下拉選單
    case 'radio':
      return 'van-radio-group'; // 單選群組
    default:
      return 'van-field'; // 預設回傳輸入框
  }
};

</script>

<template>
  <component 
    :is="getComponentType(field)"
    v-model="field.value"
    v-bind="field"
  />
</template>

<style scoped></style>
