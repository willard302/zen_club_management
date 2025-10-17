<script setup lang="ts">
definePageMeta({title: "profile"});
import Avatar from '~/components/Avatar.vue';
const authStore = useAuthStore();
const router = useRouter();
const { logout } = useAuth();
const { updateUser } = useDataBase();
const isEdit = ref(false);
const lists = reactive([
  { title: 'user_data', path: '/profile/userData' },
  { title: 'my_friends', path: '/contact/friends' }
]);
const handleToggleState = async() => {
  if (isEdit.value) {
    await updateUser(authStore.userId, { 'status': '123' });
  }
  isEdit.value = !isEdit.value;
};
const handleLogout = async () => {
  showLoadingToast({ 
    message: 'Loading...',
    forbidClick: true
  });
  await logout();
  showSuccessToast({
    message: 'logout success!'
  });
  setTimeout(() => router.push('/'), 1000)
}
</script>

<template>
  <div>
    <Avatar></Avatar>
    <van-cell-group class="profile__header">
      <div class="profile__heading">
        <div class="name">{{ authStore.userInfo!.name }}</div>
      </div>
      <div class="profile__heading">
        <div class="status">
          <input type="textarea" v-model="authStore.userInfo!.status" :disabled="!isEdit">
          <van-button v-if="!isEdit" @click="handleToggleState()">
            <client-only>
              <font-awesome :icon="['fas', 'pen']" />
            </client-only>
          </van-button>
          <van-button v-else @click="handleToggleState()">
            <client-only>
              <font-awesome :icon="['fas', 'check']" />
            </client-only>
          </van-button>
        </div>
      </div>
    </van-cell-group>
    <van-cell-group class="profile__content" inset>
      <van-cell 
        v-for="(item, idx) in lists" 
        :key="idx" 
        is-link 
        :title="$t(item.title)"
        @click="router.push(item.path)"
      />
      <van-cell 
        :title="$t('logout')"
        @click="handleLogout"
      />
    </van-cell-group>
  </div>
</template>

<style scoped lang="scss">

.profile__header {
  text-align: center;
  margin-bottom: 10px; 
}

.profile__heading {
  display: flex;
  align-items: center;
  justify-content: center;

  .name {
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0 auto;
  }

  .status {
    border: none;
    display: flex;
    align-items: center;
    position: relative;

    >input {
      height: 44px;
      text-align: center;
      border: none;
      border-bottom: 1px solid #888888;
    }

    svg {
      font-size: 0.8rem;

      &:hover,
      &:active,
      &:focus{
        color: #888888;
      }
    }

    .van-button {
      position: absolute;
      right: 0;
    }
    
    .van-button--default {
      --van-button-default-background: transparent;
      --van-button-default-border-color: transparent;
    }
  }
}

.van-cell-group.profile__content {
  box-shadow: 0 0 9px #ddd;
}
</style>
