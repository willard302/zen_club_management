<script setup lang="ts">
import MemberCard from '~/components/MemberCard.vue';
import type { ButtonItem, FieldItem } from '~/types/data.types';
import type { MemebersInsert, Role } from '~/types/supabase';
const { fieldsToDatabase } = useConverter();
const { getMembers, insertMember, rmMember } = useDataBase();
const mainStore = useMainStore();
onMounted(async() => {
  await loadMembers();
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
    name: "club_role", 
    type: "text",
    required: true,
    message: 'Hints.enter_role',
    options: [
      {text: "admin", value: "admin"},
      {text: "teacher", value: "teacher"},
      {text: "counselor", value: "counselor"},
      {text: "president", value: "president"},
      {text: "vice_president", value: "vice_president"},
      {text: "team_director", value: "team_director"},
      {text: "deputy_team_director", value: "deputy_team_director"},
      {text: "committee_member", value: "committee_member"},
      {text: "member", value: "memeber"},
      {text: "new_member", value: "new_member"},
      {text: "guest", value: "guest"}
    ]
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
    label: "email",
    value: "",
    name: "email",
    type: "email",
    required: true
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
  { text: "confirm", type: "submit" },
  { text: "cancel", type: "button", action: "cancel" }
]
const contacts = ref<MemebersInsert[]>([]);

const loadMembers = async() => {
  if (!mainStore.user || !mainStore.user.id) throw new Error(`There is no user.`);
  const members = await getMembers();
  if (members && members.length !== 0) {
    contacts.value = members;
  };
};

const handleOpenNewPanel = () => {
  showNewMemberForm.value = true;
};
const onEdit = (item: string) => {
  console.log("edit: ", item)
};
const onDelete = async(member_id: string) => {
  const result = await rmMember(member_id);
  if(result !== 204) return;
  showSuccessToast({message: "member delete successfully."});
  await loadMembers();
};
const onSubmit = async() => {
  // const newMember: MemebersInsert = {
  //   name: "Nico",
  //   birthday: "1998/01/29",
  //   inviter: mainStore.user?.id,
  //   club_role: "member",
  //   email: "test002@gmail.com",
  //   department: "economist",
  //   student_year: "freshman"
  // };

  // await insertMember(newMember)
  const newMember = fieldsToDatabase(fieldItems);
  console.log(newMember)
};
const handleOnClick = async(event: string) => {
  if (event === 'cancel') {
    showNewMemberForm.value = false
  }
};
</script>

<template>
  <div>
    <van-sticky :offset-top="46">
      <MemberCard type="add" @add="handleOpenNewPanel" />
    </van-sticky>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMembers"
    >
      <MemberCard
        v-for="contact in contacts"
        :key="contact.name"
        type="edit"
        :id="contact.id"
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

<style scoped lang="scss"></style>
