<script setup lang="ts">
definePageMeta({
  title: 'register'
});
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";
import type { ButtonItem, FieldItem } from "~/types/data.types";
const router = useRouter();
const { register } = useAuth();
const fieldItems: FieldItem[] = reactive([
  { 
    label: "username",
    value: "test002@gmail.com", 
    name: "username", 
    type: "text",
    placeholder: "Hints.enter_email",
    required: true,
    message: 'Hints.enter_email',
    autocomplete: "username"
  },
  {
    label: "password", 
    value: "123456", 
    name: "password", 
    type: "password",
    placeholder: "Hints.enter_password",
    required: true, 
    message: 'Hints.enter_password',
    autocomplete: "new-password"
  },
  {
    label: "password_confirm", 
    value: "123456", 
    name: "password_confirm", 
    type: "password",
    placeholder: "Hints.enter_password",
    required: true, 
    message: 'Hints.enter_password',
    autocomplete: "new-password"
  }
]);
const buttonItems: ButtonItem[] = [
  { text: "submit", type: "submit", to: "" },
  { text: "login", type: "button", to: "/auth/login" }
];

const handleRegister = async() => {
  const username = fieldItems.find(item => item.name === "username")?.value;
  const password = fieldItems.find(item => item.name === "password")?.value;
  const password_confirm = fieldItems.find(item => item.name === "password_confirm")?.value;
  if (password !== password_confirm) return showFailToast("password is different");
  showLoadingToast({
    message: "Loading...",
    forbidClick: true
  });

  const { error } = await register(username as string, password as string);

  if(error) {
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
};
</script>

<template>
  <FieldForm
    :fieldItems="fieldItems"
    :buttonItems="buttonItems"
    @submit="handleRegister"
  ></FieldForm>
</template>

<style scoped></style>
