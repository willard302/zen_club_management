<script setup lang="ts">
definePageMeta({ title: 'user_data' });
import UserForm from '~/components/UserForm.vue';
import type { UserRow } from '~/types/supabase';

const mainStore = useMainStore();
const { updateUser } = useDataBase();
const isEditable = ref(false);

const onSubmit = async (val: Partial<UserRow>) => {
  if (!mainStore.userInfo || !mainStore.userInfo.id) throw new Error("There is no user data or user id.");

  showLoadingToast({message: "Loading..."});

  mainStore.setUser(val)
  await updateUser(mainStore.userInfo.id, mainStore.userInfo);
  
  showSuccessToast({
    message: 'saved success!',
    onClose: () => isEditable.value = false
  });
};

const onEdit = (val:boolean) => {
  isEditable.value = val;
};
</script>
<template>
  <UserForm 
    :user-data="mainStore.userInfo"
    :editable="isEditable"
    @editable="onEdit"
    @submit="onSubmit"
  />
</template>

<style scoped lang="scss"></style>
