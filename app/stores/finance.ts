import type { FinanceStoreState } from "~/types/data.types"
import type { FinancesInsert } from "~/types/supabase";
export const useFinanceStore = defineStore('finance', {
  state: (): FinanceStoreState => ({
    records: [
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
    ]
  }),
  getters: {},
  actions: {
    addRecord(record: FinancesInsert) {
      this.records.push(record);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      // const {setItem} = useLocalStorage();
      // setItem('finance_records', this.records);
      console.log('save...')
    },
    loadFromLocalStorage() {
      // const { getItem } = useLocalStorage();
      // const data = getItem('finance_records');
      // if (data) {
      //   this.records = data
      // }
      console.log('load...')
    }
  }
})