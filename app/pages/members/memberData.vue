<script setup lang="ts">
import UserForm from '~/components/UserForm.vue';
import type { MemebersRow } from '~/types/supabase';

const memberStore = useMemberStore();
const { updateMember } = useDataBase();
const isEditable = ref(false);

const onSubmit = async (val: Partial<MemebersRow>) => {
  if (!memberStore.member || !memberStore.member.id) throw new Error("There is no user data or user id.");

  showLoadingToast({message: "Loading..."});

  memberStore.setMember(val);
  await updateMember(memberStore.member.id, memberStore.member);

  showSuccessToast({
    message: 'saved success!',
    onClose: () => {
      isEditable.value = false;
      memberStore.setMember({});
    }
  });
};

const onEdit = (val:boolean) => {
  isEditable.value = val;
};
</script>

<template>
  <UserForm 
    :user-data="memberStore.member"
    :editable="isEditable"
    @editable="onEdit"
    @submit="onSubmit"
  />
</template>

<style scoped lang="scss"></style>
