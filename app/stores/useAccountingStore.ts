import type { AccountingInsert } from "~/types/supabase";
export const useAccountingStore = defineStore('accounting', () => {

  const records = ref<AccountingInsert[]>([]);

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