<script setup lang="ts">
import FinancialCard from '~/components/FinancialCard.vue';
const financeStore = useFinanceStore();
</script>

<template>
  <FinancialCard 
    v-for="record in financeStore.records"
    :key="record.id"
    :category="record.category"
    :amount="record.amount"
    :note="record.note"
    :date="record.date"
    :payee="record.payee"
    :accountant="record.accountant"
    :type="record.type ?? ''"
  />
</template>

<style scoped></style>
