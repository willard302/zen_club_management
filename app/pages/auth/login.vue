<script setup lang="ts">
definePageMeta({
  title: 'login'
});
import FieldForm from './components/FieldForm.vue';
const { login } = useAuth();
const router = useRouter();
const username = ref('test001@gmail.com');
const password = ref('123456');

const fieldItems = reactive([
  { 
    label: "username",
    value: username.value, 
    name: "username", 
    type: "text",
    placeholder: "Hints.enter_mail",
    required: true,
    message: 'Hints.enter_mail'
  },
  {
    label: "password", 
    value: password.value, 
    name: "password", 
    type: "password",
    placeholder: "Hints.enter_password",
    required: true, 
    message: 'Hints.enter_password',
    autocomplete: "current-password"
  }
]);

const handleLogin = async() => {
  showLoadingToast({
    message: "Loading...",
    forbidClick: true
  });

  const { data, error } = await login(username.value, password.value);

  if(error) {
    showFailToast({
      message: error.message,
      forbidClick: true
    })
  } else {
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
    :onSubmit="handleLogin"
    :buttonItems="buttonItems"
  />
</template>

<style scoped></style>
