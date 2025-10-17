<script setup lang="ts">
const { getUser, getUsers, updateUser, getFriends } = useDataBase();
const authStore = useAuthStore();
const currentUser = ref(authStore.userId);
const isLoading = ref(false);
const isFinished = ref(false);
const active = ref<string[]>(['1', '2']);
const collapse = ref(null);
const friendList = ref([]);
const pendingList = ref([]);
const updateFriendList = async(requests:Request[]) => {
  try {
    if (!currentUser.value) return;

    // const request = requests || await getFriendRequest(currentUser);
  
    // const requestGet = request.filter(one => one.to === currentUser);
    // const requestSent = request.filter(one => one.from === currentUser);
    
    // const responseFriends = await getUserFriends(currentUser);
    // const oldFriends = responseFriends.map(one => one.id);

    // const listGot = requestGet.map(one => one.from);
    // const listSent = requestSent.map(one => one.to);
    const userFriends = await getFriends(currentUser.value);
    console.log(userFriends)
    
    // const newFriends = res.filter(one => !listGot.includes(one.id));
    
    // friendList.value = newFriends
    //   .filter(one => one.id !== currentUser)
    //   .filter(one => !oldFriends.includes(one.id))
    //   .map(one => ({
    //     id: one.id,
    //     name: one.name,
    //     avatar_url: one.avatar_url,
    //     status: one.status,
    //     relation: listSent.includes(one.id) ? "pending" : "strange"
    //   }));


    // const pendingFriends = res.filter(one => listGot.includes(one.id));
    // pendingList.value = pendingFriends.map(one => ({
    //   id: one.id,
    //   name: one.name,
    //   avatar_url: one.avatar_url,
    //   status: one.status
    // }));
  } catch (error) {
   console.error("更新好友列表失敗: ", error); 
  }
}
</script>

<template>
  <van-collapse class="newFriends" v-model="active" ref="collapse">
    <van-collapse-item class="friend__title" :title="$t('friend_request')" name="1">
      <van-list
        :loading="isLoading"
        :finished="isFinished"
        finished-text="沒有更多數據"
        @load="updateFriendList"
      >
        <!-- <NewFriendLists
        :data="pendingList"
        :onClickConfirm="confirmFriendRequest"
        :onClickCancel="rejectFriendRequest"
        /> -->
      </van-list>
    </van-collapse-item>

    <van-collapse-item class="friend__title" :title="$t('friend_recommend')" name="2">
      <van-list 
        :loading="isLoading"
        :finished="isFinished"
        finished-text="沒有更多數據"
        @load="updateFriendList"
      >
        <!-- <NewFriendLists
          :data="friendList"
          :onClickAdd="addNewFriend"
          :onClickCancel="cancelFriendRequest"
        /> -->
      </van-list>
    </van-collapse-item>
  </van-collapse>
</template>

<style scoped></style>
