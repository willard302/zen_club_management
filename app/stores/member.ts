import type { MemberItem } from "~/types/data.types";
import type { MemebersInsert, MemebersRow, MemebersUpdate } from "~/types/supabase";

export const useMemberStore = defineStore('member', () => {

  const memberSelected = ref<MemebersInsert | MemebersUpdate>({});
  const memberList = ref<MemberItem[]>([]);
  const memberPickerId = ref("");

  const setMember = (member: MemebersRow | MemebersUpdate) => {
    memberSelected.value = {...memberSelected, ...member}
  };

  return {
    memberSelected,
    memberList,
    memberPickerId,
    setMember
  }
},
{ persist: true }
)