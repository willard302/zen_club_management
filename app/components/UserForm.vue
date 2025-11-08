<script setup lang="ts">
defineProps<{
  userData: Record<string, any>,
  editable?: boolean
}>();

defineEmits(['update', 'submit'])
</script>

<template>
  <div>
    Component: UserForm
  </div>
</template>

<style scoped></style>
