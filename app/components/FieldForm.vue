<script setup lang="ts">
import type { ButtonItem, FieldItem } from '~/types/data.types';

const props = defineProps<{
  fieldItems: FieldItem[],
  buttonItems?: ButtonItem[]
}>();

const emit = defineEmits(['submit']);

const fields = ref(props.fieldItems);

const onSubmit = () => {
  emit('submit', fields.value);
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-for="(field, fieldIdx) in fields"
        :key="fieldIdx"
        :type="field.type"
        v-model="field.value"
        :name="field.name"
        :label="$t(field.label)"
        :placeholder="$t(field.placeholder ?? '')"
        :rules="[{
          required: field.required,
          message: $t(field.message ?? '')
        }]"
        :input-attrs="{ autocomplete: field.autocomplete }"
      />
    </van-cell-group>
    <div v-if="props.buttonItems" class="button__menu">
      <van-button 
        v-for="(btnItem, btnIdx) in props.buttonItems"
        :key="btnIdx"
        round block
        type="primary"
        :native-type="btnItem.type"
        :to="btnItem.to"
      >
        {{ $t(btnItem.text) }}
      </van-button>
    </div>
  </van-form>
</template>

<style scoped lang="scss">
.van-form {
  position: fixed;
  top: 20%;
  left: 5%;
  width: 90%;
}
.button__menu {
  margin: 20px auto 10px;

  .van-button {
    margin: 10px auto;
    max-width: 80%;
  }
}
</style>
