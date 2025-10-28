<script setup lang="ts">
import type { ButtonItem } from '~/types/data.types';

const props = defineProps(['fieldItems', 'buttonItems', 'customClass'])

const emit = defineEmits(['submit', 'button']);
const fields = ref(props.fieldItems);
const handleOnClick = (event: ButtonItem) => {
  if (event.to) return navigateTo(event.to);
  if (event.type === 'submit') return emit('submit', fields.value);
  if (event.action) return emit('button', event.action);
}
</script>

<template>
  <van-form :class="props.customClass">
    <van-cell-group inset>
      <template v-for="(field, fieldIdx) in fields" :key="fieldIdx">
        <template v-if="field.type === 'checkbox'">
          <van-field
            :type="field.type"
            :name="field.name"
            :label="$t(field.label)"
          >
            <template v-if="field.type === 'checkbox'" #input>
              <van-switch v-model="field.value" />
            </template>
          </van-field>
        </template>
        <van-field
          v-else
          :type="field.type"
          v-model="field.value"
          :name="field.name"
          :label="$t(field.label)"
          :placeholder="field.placeholder ? $t(field.placeholder) : ''"
          :rules="[{
            required: field.required,
            message: field.message ? $t(field.message) : ''
          }]"
          :input-attrs="{ autocomplete: field.autocomplete }" 
        />
      </template>
      
    </van-cell-group>
    <div v-if="props.buttonItems" class="button__menu">
      <van-button 
        v-for="(btnItem, btnIdx) in props.buttonItems"
        :key="btnIdx"
        round block
        type="primary"
        :native-type="btnItem.type"
        @click="handleOnClick(btnItem)"
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
.calendar, .members {
  .button__menu {
    display: flex;

    .van-button {
      width: 40%;
    }
  }
} 
</style>
