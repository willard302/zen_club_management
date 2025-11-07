<script setup lang="ts">
import type { FinancesInsert } from '~/types/supabase';

const financeStore = useFinanceStore();
const type = ref<'income' | 'expense'>('income');
const category = ref('');
const amount = ref<number>(0);
const note = ref('');
const showTypePicker = ref(false);

const onTypeConfirm = (value: string) => {
  type.value = value as 'income' | 'expense';
  showTypePicker.value = false;
};

const addRecord = (record: FinancesInsert) => {
  console.log("add")
  // records.push(record);
  // saveToLocalStorage();
};

const onSubmit = () => {
  if (!amount.value || !category.value) {
    showToast({ message: "請輸入完整資料" });
    return;
  };

  addRecord({
    id: crypto.randomUUID(),
    type: type.value,
    category: category.value,
    amount: amount.value,
    date: new Date().toISOString(),
    note: note.value
  });

  category.value = '';
  amount.value = 0;
  note.value = '';

}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-field v-model="type" label="類型" placeholder="收入/支出" is-link readonly @click="showTypePicker = true" />
    <van-field v-model="category" label="分類" placeholder="餐飲/交通/娛樂" />
    <van-field v-model.number="amount" label="金額" type="number" />
    <van-field v-model="note" label="備註" placeholder="選填" />
    <van-button round block type="primary" native-type="submit">新增</van-button>
  </van-form>
  <van-popup v-model:show="showTypePicker" position="bottom">
    <van-picker :columns="[{text:'收入'},{text:'支出'}]" @confirm="onTypeConfirm" @cancel="showTypePicker = false" />
  </van-popup>
</template>

<style scoped></style>
