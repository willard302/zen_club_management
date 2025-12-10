import type { AccountingInsert } from "~/types/supabase";
export const useAccountingStore = defineStore('accounting', () => {

  const records = ref<AccountingInsert[]>([
    {
      accountant: 'nico',
      amount: 1800,
      category: '營隊',
      date: '2024-01-01',
      id: '123lsdkjfalks',
      note: '報名費',
      payee: '小明',
      type: 'income'
    }
  ]);

  const addRecord = (record: AccountingInsert) => records.value.push(record);

  const loadRecord = () => records.value;

  return {
    records,
    addRecord,
    loadRecord
  }
},
{ 
  persist: true 
}
)