<script setup lang="ts">
import MemberCard from '~/components/MemberCard.vue';
import { role_options, grade_options } from '~/data/data';
import type { ButtonItem, FieldItem } from '~/types/data.types';
import type { MemebersInsert } from '~/types/supabase';
const { fieldsToDatabase } = useConverter();
const { getMembers, insertMember, rmMember } = useDataBase();
const mainStore = useMainStore();
const { t } = useI18n();
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
    type: "date",
    required: false,
    message: 'Hints.enter_birthday'
  },
  { 
    label: "role",
    value: "", 
    name: "club_role", 
    required: true,
    message: 'Hints.enter_role',
    options: role_options.map(o => ({text: t(`Role.${o.text}`), value: o.value}))
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
    label: "grade",
    value: "", 
    name: "grade", 
    required: false,
    message: 'Hints.enter_student_year',
    options: grade_options.map(o => ({text: t(`Grade.${o.text}`), value: o.value}))
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
  finished.value = true;
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
  const newMember: MemebersInsert = fieldsToDatabase(fieldItems);
  if (newMember) {
    const result = await insertMember(newMember);
  };
  showNewMemberForm.value = false;
};
const handleOnClick = async(event: string) => {
  if (event === 'cancel') {
    showNewMemberForm.value = false
  }
};
</script>

<template>
  <div>
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
    <van-floating-bubble icon="plus" @click="handleOpenNewPanel" />
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
