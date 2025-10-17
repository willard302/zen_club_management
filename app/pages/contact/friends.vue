<script setup lang="ts">
const authStore = useAuthStore();
const { getUser, getFriends } = useDataBase();
const isLoading = ref(false);
const isFinished = ref(false);
const lists = ref([]);
const loadFriendLists = async() => {
  if(isFinished.value) return;

  isLoading.value = true;

  try {
    const res = await getFriends(authStore.userId);
    console.log(authStore.userId)
    console.log(res)
    res.forEach(async(list) => {
      console.log(list)
      // const info = await getUser(list.friend_id);

    })
    isLoading.value = false;
    isFinished.value = true;
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <van-list
    :loading="isLoading"
    :finished="isFinished"
    finished-text="no more data"
    @load="loadFriendLists"
    @update:loading="(val) => isLoading = val"
  >
  
    <!-- <ContactListSlot 
      :data="list"
      :onClickAction="createOrOpenChat"
      :onSlideDelete="deleteFriendAndChat"
    ></ContactListSlot> -->
  </van-list>
</template>

<style scoped lang="scss"></style>
