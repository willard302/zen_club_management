import type { MemberStoreState } from "~/types/data.types";
import type { MemebersRow, MemebersUpdate } from "~/types/supabase";

export const useMemberStore = defineStore('member', {
  state: ():MemberStoreState => ({
    member: {}
  }),
  actions: {
    setMember(member: MemebersRow | MemebersUpdate) {
      this.member = { ...this.member, ...member };
    }
  },
  persist: true
})