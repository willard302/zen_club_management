<script setup lang="ts">
definePageMeta({title: 'login'});
import type { ButtonItem, FieldItem } from '~/types/data.types';
const { login } = useAuth();
const { getUser } = useDataBase();
const router = useRouter();
const mainStore = useMainStore();

const fieldItems: FieldItem[] = reactive([
  { 
    label: "username",
    value: 'test001@gmail.com', 
    name: "username", 
    type: "text",
    placeholder: "Hints.enter_email",
    required: true,
    message: 'Hints.enter_email',
    autocomplete: "username"
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

const handleLogin = async(account: FieldItem[]) => {
  showLoadingToast({
    message: "Loading...",
    forbidClick: true
  });

  const username = account.find(item => item.name === 'username')?.value;
  const password = account.find(item => item.name === 'password')?.value;

  if (!username || !password) throw new Error("There is no username or password.");

  const response = await login(username as string, password as string);

  if (!response.user || !response.user.id) throw new Error("Login failed");

  const user_id = response.user.id;

  mainStore.setAuthenticated(!!user_id);
  mainStore.setUser({id: user_id});

  const user = await getUser(user_id);
  mainStore.setUser(user);
  
  if (user === null) {
    throw new Error(`the user is null.`)
  } else{
    showSuccessToast({
      message: "login successfully",
      forbidClick: true
    });
    setTimeout(() => {
      router.push('/profile');
      mainStore.setTabbar(true);
    }, 2000);
  }
};

const buttonItems: ButtonItem[] = [
  { text: "submit", type: "submit" },
  { text: "register", type: "button", to: "/auth/register" }
];
</script>

<template>
  <FieldForm 
    :fieldItems="fieldItems"
    :buttonItems="buttonItems"
    @submit="handleLogin"
  />
</template>

<style scoped></style>
