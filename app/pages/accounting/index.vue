<script setup lang="ts">
import type { ButtonItem, FieldItem } from '~/types/data.types';
import AccountingCard from '~/pages/accounting/components/AccountingCard.vue';
import { account_type_options } from '~/data/data';

const { t } = useI18n();
const accountingStore = useAccountingStore();

const showNewAccounting = ref(false);
const fieldItems: FieldItem[] = reactive([
  { 
    label: "type",
    value: "", 
    name: "type", 
    required: true,
    options: account_type_options.map(o => ({text: t(o), value: o}))
  },
  { 
    label: "category",
    value: "", 
    name: "category", 
    type: "text",
    required: true
  },
  { 
    label: "date",
    value: "", 
    name: "date", 
    type: "date",
    required: true
  },
  { 
    label: "amount",
    value: "", 
    name: "amount", 
    type: "number",
    required: true
  },
  { 
    label: "payee",
    value: "", 
    name: "payee", 
    type: "text",
    required: true
  },
  { 
    label: "accountant",
    value: "", 
    name: "accountant", 
    type: "text",
    required: true
  },
  { 
    label: "note",
    value: "", 
    name: "note", 
    type: "text",
    required: true
  },
]);

const buttonItems: ButtonItem[] = [
  { text: "confirm", type: "submit" },
  { text: "cancel", type: "button", action: "cancel" }
];

const handleOpenNewPanel = () => {
  showNewAccounting.value = true;
};

const onSubmit = async() => {
  console.log("onsubmit")
};

const handleOnClick = async(event: string) => {
  switch(event) {
    case "cancel":
      showNewAccounting.value = false;
      break;
    case "edit":
      navigateTo('/accounting/components/FinancialEditor')
      break;
  }
  
};
</script>

<template>
  <div>
    <AccountingCard 
      v-for="record in accountingStore.records"
      :key="record.id"
      :category="record.category"
      :amount="record.amount"
      :note="record.note"
      :date="record.date"
      :payee="record.payee"
      :accountant="record.accountant"
      :type="record.type ?? ''"
      @edit="handleOnClick"
    />
    <van-floating-bubble icon="plus" @click="handleOpenNewPanel" />
    <van-popup 
      v-model:show="showNewAccounting" 
      position="bottom"
      round
    >
      <FieldForm
        custom-class="members" 
        :field-items="fieldItems"
        :button-items="buttonItems"
        button-class="d-flex-40"
        @submit="onSubmit"
        @button="handleOnClick"
      />
    </van-popup>
  </div>
</template>

<style scoped></style>
