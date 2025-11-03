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
  getters: {
    totalIncome(){
      this.records
        .filter((r:FinancesInsert) => r.type === 'income')
        // .reduce((a, b) => a + b.amount, 0)
    },
    totalExpense(){
      this.records
        .filter((r:FinancesInsert) => r.type === 'expense')
        // .reduce((a, b) => a + b.amount, 0)
    }
  },
  actions: {
    addRecord(record: FinancesInsert) {
      this.records.push(record);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('finance_reocrds', JSON.stringify(this.records));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('finance_records');
      if (data) {
        this.records = JSON.parse(data)
      }
    }
  }
})