<script setup lang="ts">
const data = ref([
  {
    id: 1,
    avatar_url: "https://i.pravatar.cc/150?img=1",
    name: "Alice Johnson",
    status: "online"
  }
]);

const avatarDefault = "";

const onClickAction = (id: number | string) => {
  console.log("onClickAction", id)
};

const onSlideDelete = (id: number | string) => {
  console.log("onSlideDelete: ", id)
}
</script>

<template>
  <div>
    <van-swipe-cell v-for="(item, idx) in data" :key="idx">
      <van-cell @click="onClickAction(item.id)">
        <van-image :src="item.avatar_url">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>
            <van-image :src="avatarDefault"></van-image>
          </template>
        </van-image>
        <div class="contactList__info">
          <div class="contactList__name" >{{ item.name }}</div>
          <div v-if="item.status" class="contactList__status" >{{ item.status }}</div>
        </div>
      </van-cell>
      <template #right>
        <van-button 
          square 
          type="danger" 
          :text="$t('delete')"  
          @click="onSlideDelete(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<style scoped lang="scss">
  .van-cell {
    align-items: center;
  }
  :deep(.van-cell__value) {
    display: flex;
    align-items: center;
  }
  .van-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden
  }
  .contactList__info {
    width: 80%;
    text-align: left;
    padding-left: 10px;
  }
  .contactList__name {
    font-weight: 700;
    color: #111111;
  }
  .contactList__status {
    font-size: 12px;
  }
  .van-button {
    height: 100%;
  }
</style>

