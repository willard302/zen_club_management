<script setup lang="ts">
definePageMeta({title: 'login'});
import type { account } from '~/types/auth.types';
import FieldForm from './components/FieldForm.vue';
const { login } = useAuth();
const { getUser } = useDataBase();
const router = useRouter();
const authStore = useAuthStore();

const fieldItems: account[] = reactive([
  { 
    label: "username",
    value: 'test001@gmail.com', 
    name: "username", 
    type: "text",
    placeholder: "Hints.enter_mail",
    required: true,
    message: 'Hints.enter_mail'
  },
  {
    label: "password", 
    value: '123456', 
    name: "password", 
    type: "password",
    placeholder: "Hints.enter_password",
    required: true, 
    message: 'Hints.enter_password',
    autocomplete: "current-password"
  }
]);

const handleLogin = async(account: account[]) => {
  showLoadingToast({
    message: "Loading...",
    forbidClick: true
  });

  const username = account.find(item => item.name === 'username')?.value
  const password = account.find(item => item.name === 'password')?.value

  const response = await login(username as string, password as string);

  if (!response.user || !response.user.id) throw new Error("Login failed");

  authStore.setAuthenticated(!!response.user.id);
  authStore.setUserId(response.user.id);

  const user = await getUser(response.user.id);
  authStore.setUserInfo(user);
  
  if (user === null) {
    throw new Error(`the user is null.`)
  } else{
    showSuccessToast({
      message: "login successfully",
      forbidClick: true
    });
    setTimeout(() => {
      router.push('/profile');
    }, 2000);
  }
};

const buttonItems = [
  { text: "submit", type: "submit", to: null },
  { text: "register", type: "button", to: "/auth/register" }
];
</script>

<template>
  <FieldForm 
    :field-items="fieldItems"
    :buttonItems="buttonItems"
    @submit="handleLogin"
  />
</template>

<style scoped></style>
