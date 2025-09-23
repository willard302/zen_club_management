<script setup lang="ts">
definePageMeta({
  title: 'register'
})
import FieldForm from "./components/FieldForm.vue"
const username = ref('test002@gmail.com');
const password = ref('123456');
const password_confirm = ref('123456');
const router = useRouter();
const { register } = useAuth();
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
    autocomplete: "new-password"
  },
  {
    label: "password_confirm", 
    value: password_confirm.value, 
    name: "password_confirm", 
    type: "password",
    placeholder: "Hints.enter_password",
    required: true, 
    message: 'Hints.enter_password',
    autocomplete: "new-password"
  }
]);
const buttonItems = [
  { text: "submit", type: "submit", to: null },
  { text: "login", type: "button", to: "/auth/login" }
];

const handleRegister = async() => {
  if (password.value !== password_confirm.value) return showFailToast("password is different");

  showLoadingToast({
    message: "Loading...",
    forbidClick: true
  });

  const { error } = await register(username.value, password.value);

  if(error) {
    console.error(error.message)
    showFailToast({
      message: error.message,
      forbidClick: true
    })
  } else {
    showSuccessToast({
      message: "register successfully",
      forbidClick: true
    });
    router.push("/auth/login")
  }
}
</script>

<template>
  <FieldForm
    :fieldItems="fieldItems"
    :buttonItems="buttonItems"
    :onSubmit="handleRegister"
  ></FieldForm>
</template>

<style scoped></style>
