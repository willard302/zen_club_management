<script setup lang="ts">
import type { FieldItem } from '~/types/data.types';

const eventStore = useEventStore();

const order = [
  "id","title","start_at","end_at","all_day","recurrence","location","participants","description","color","created_at","created_by"
];
const hideItems = ["id","created_at","created_by"];

const loading = ref(false);
const finished = ref(true);
const localEvent = ref({...eventStore.event});

const fields = computed(() => {
  return Object.entries(localEvent.value)
    .filter(([key]) => !hideItems.includes(key))
    .map(([key, val]) => ({
      label: key,
      value: String(val),
      name: key
    }))
    .sort((a,b) => order.indexOf(a.name) - order.indexOf(b.name))
});

</script>

<template>
  <van-list 
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
  >
    <FieldForm :field-items="fields"/>
  </van-list>
</template>

<style scoped></style>
