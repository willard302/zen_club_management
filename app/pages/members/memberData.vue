<script setup lang="ts">
import UserForm from '~/components/UserForm.vue';
import type { MemebersRow } from '~/types/supabase';

const memberStore = useMemberStore();
const { updateMember } = useDataBase();
const isEditable = ref(false);

const onSubmit = async (val: Partial<MemebersRow>) => {
  if (!memberStore.memberSelected || !memberStore.memberSelected.id) throw new Error("There is no user data or user id.");

  showLoadingToast({message: "Loading..."});

  memberStore.setMember(val);
  await updateMember(memberStore.memberSelected.id, memberStore.memberSelected);

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
    :user-data="memberStore.memberSelected"
    :editable="isEditable"
    @editable="onEdit"
    @submit="onSubmit"
  />
</template>

<style scoped lang="scss"></style>
