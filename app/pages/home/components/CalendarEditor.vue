<script setup lang="ts">
import type { ButtonItem, FieldItem } from '~/types/data.types';

const props = defineProps<{
  modelValue: boolean,
  fieldItems?: FieldItem[],
  buttonClass?: string,
  buttonItems?: ButtonItem[],
  title?: string
}>();
const emit = defineEmits(['update:modelValue', 'submit', 'button']);

const internalShow = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newVal) => internalShow.value = newVal
);
watch(internalShow, (newVal) => {
  emit('update:modelValue', newVal);
})

const handleSubmit = () => emit('submit');
const handlOnClick = (action:string) => emit('button', action)

</script>

<template>
  <van-popup
    v-model:show="internalShow"
    position="bottom"
    round
  >
    <div class="calendar-editor">
      <h3 v-if="props.title" class="calendar-editor__title">
        {{ props.title }}
      </h3>
      <FieldForm 
        custom-class="calendar"
        :field-items="props.fieldItems"
        :button-class="props.buttonClass ? props.buttonClass : undefined"
        :button-items="props.buttonItems"
        @submit="handleSubmit"
        @button="handlOnClick"
      />
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
.calendar-editor {
  padding: 12px 16px;
  &__title {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 12px;
  }
}

:deep(.calendar .van-field) {
  flex-wrap: nowrap;
  align-items: center;
}
</style>
