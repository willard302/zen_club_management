<script setup lang="ts">
import MemberCard from '~/components/MemberCard.vue';
import type { ButtonItem, FieldItem } from '~/types/data.types';
import type { MemebersInsert } from '~/types/supabase';

const { getMembers, insertMember } = useDataBase();
const mainStore = useMainStore();
onMounted(async() => {
  contacts.value = await loadMembers();
});

const loading = ref(false);
const finished = ref(false);
const showNewMemberForm = ref(false);
const fieldItems: FieldItem[] = reactive([
  { 
    label: "name",
    value: "", 
    name: "name", 
    type: "text",
    required: true,
    message: 'Hints.enter_name'
  },
  { 
    label: "birthday",
    value: "", 
    name: "birthday", 
    type: "datetime-local",
    required: false,
    message: 'Hints.enter_birthday'
  },
  { 
    label: "role",
    value: "", 
    name: "role", 
    type: "text",
    required: true,
    message: 'Hints.enter_role'
  },
  { 
    label: "department",
    value: "", 
    name: "department", 
    type: "text",
    required: false,
    message: 'Hints.enter_department'
  },
  { 
    label: "student_year",
    value: "", 
    name: "student_year", 
    type: "text",
    required: false,
    message: 'Hints.enter_student_year'
  },
  { 
    label: "inviter",
    value: "", 
    name: "inviter", 
    type: "text",
    required: false,
    message: 'Hints.enter_inviter'
  }
]);
const buttonItems: ButtonItem[] = [
  { text: "confirm", type: "submit", to: "" },
  { text: "cancel", type: "button", to: "" }
]
const contacts = ref<MemebersInsert[]>([]);

const loadMembers = async():Promise<MemebersInsert[]> => {
  if (!mainStore.user || !mainStore.user.id) throw new Error(`There is no user.`);
  const members = await getMembers();
  return members ?? [];
};

const onAdd = (item: string) => {
  showNewMemberForm.value = true;
};
const onEdit = (item: string) => {
  console.log("edit: ", item)
};
const onDelete = (item: string) => {
  console.log("delete: ", item)
};
const onSubmit = async() => {
  const newMember: MemebersInsert = {
    name: "Nico",
    birthday: "1998/01/29",
    inviter: mainStore.user?.id,
    club_role: "member",
    email: "test002@gmail.com",
    department: "economist",
    student_year: "freshman"
  };

  await insertMember(newMember)
}
</script>

<template>
  <div>
    <van-sticky :offset-top="46">
      <MemberCard type="add" @add="onAdd" />
    </van-sticky>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMembers"
    >
      <MemberCard
        v-for="contact in contacts"
        type="edit"
        :key="contact.name"
        :name="contact.name"
        :club_role="contact.club_role"
        :club_group="contact.club_group"
        :birth="contact.birthday"
        :department="contact.department"
        @edit="onEdit"
        @delete="onDelete"
      ></MemberCard>
    </van-list>
    <van-popup 
      v-model:show="showNewMemberForm" 
      position="bottom"
      round
      @confirm="onSubmit"
    >
      <FieldForm
        custom-class="members" 
        :field-items="fieldItems"
        :button-items="buttonItems"
      />
    </van-popup>
  </div>
</template>

<style scoped lang="scss"></style>
