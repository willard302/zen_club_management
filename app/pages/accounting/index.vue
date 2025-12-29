<script setup lang="ts">
import type { ButtonItem, FieldItem } from '~/types/data.types';
import AccountingCard from '~/pages/accounting/components/AccountingCard.vue';
import { account_type_options } from '~/data/data';

const { t } = useI18n();
const { insertAccounting, getAccountings, rmAccounting } = useDataBase();
const { fieldsToObjAccounting } = useConverter();
const accountingStore = useAccountingStore();

const showNewAccounting = ref(false);
const loading = ref(false);
const finished = ref(false);

const fieldItems: FieldItem[] = reactive([
  { 
    label: "type",
    value: "", 
    name: "type", 
    required: true,
    options: account_type_options.map(o => ({text: t(o), value: o}))
  },
  { 
    label: "activity",
    value: "", 
    name: "activity", 
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
    label: "payer",
    value: "", 
    name: "payer", 
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
    label: "remark",
    value: "", 
    name: "remark", 
    type: "text",
    required: true
  },
]);

const buttonItems: ButtonItem[] = [
  { text: "confirm", type: "submit" },
  { text: "cancel", type: "button", action: "cancel" }
];

const loadAccounting = async() => {
  loading.value = true;
  accountingStore.records = await getAccountings();
  loading.value = false;
  finished.value = true;
}

const handleOpenNewPanel = () => {
  showNewAccounting.value = true;
};

const onSubmit = async(target: FieldItem[]) => {
  const accountingInfo = await fieldsToObjAccounting(target);

  if (accountingInfo.type) {
    accountingInfo.type = reverseMapAccounting[accountingInfo.type];
  };

  const result = await insertAccounting(accountingInfo)
  if (result) {
    showSuccessToast("insert accounting successfully.")
    showNewAccounting.value = false;
    loadAccounting();
  };
};

const handleOnClick = async(event: string) => {
  switch(event) {
    case "cancel":
      showNewAccounting.value = false;
      break;
    case "edit":
      navigateTo('/accounting/components/FinancialEditor')
      break;
  };
};

const onDelete = async(accounting_id: string) => {
  const result = await rmAccounting(accounting_id);
  if (result !== 204) return;
  showSuccessToast("record delete successfully.");
  await loadAccounting();
}
</script>

<template>
  <div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="'no more'"
      @load="loadAccounting"
    >
      <AccountingCard 
        v-for="record in accountingStore.records"
        :key="record.id"
        :id="record.id"
        :activity="record.activity"
        :amount="record.amount"
        :remark="record.remark"
        :date="record.date"
        :payer="record.payer"
        :accountant="record.accountant"
        :type="record.type ?? ''"
        @edit="handleOnClick"
        @delete="onDelete"
      />
    </van-list>
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
