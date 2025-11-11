<script setup lang="ts">
import type { ButtonItem, FieldItem } from '~/types/data.types';
const { t } = useI18n();

const props = defineProps<{
  fieldItems?: FieldItem[],
  buttonItems?: ButtonItem[],
  customClass?: string,
  buttonClass?: string
}>();

const emit = defineEmits(['submit', 'button']);

const fields = ref(props.fieldItems);

const showPicker = ref(false);
const pickerOptions = ref<any[]>([]);
const pickerField = ref<FieldItem | null>(null);
const labelWidth = '6em';

const handleOnClick = (event: ButtonItem) => {
  if (event.to) return navigateTo(event.to);
  if (event.type === 'submit') return emit('submit', fields.value);
  if (event.action) return emit('button', event.action);
};

const openPicker = (field: FieldItem) => {
  switch(field.name) {
    case "club_role":
      pickerOptions.value = field.options?.map(f => ({text: f.text, value: t(`Role.${f.value}`)})) ?? [];
      break;
    case "grade":
      pickerOptions.value = field.options?.map(f => ({text: f.text, value: t(`Grade.${f.value}`)})) ?? [];
      break;
  };
  pickerField.value = field;
  showPicker.value = true;
};

const onConfirm = (
  {selectedValues}: 
  {selectedValues: string[]}
) => {
  if (!pickerField.value) return;
  pickerField.value.value = selectedValues[0] ?? '';
  showPicker.value = false;
};

const onCancel = () => {
  showPicker.value = false;
};
</script>

<template>
  <van-form :class="props.customClass">
    <van-cell-group v-if="fields" inset>
      <template v-for="(field, fieldIdx) in fields" :key="fieldIdx">

        <van-field
          v-if="field.type === 'checkbox'"
          :type="field.type"
          :name="field.name"
          :label="$t(field.label)"
          :label-width="labelWidth"
        >
          <template v-if="field.type === 'checkbox'" #input>
            <van-switch v-model="field.value" />
          </template>
        </van-field>

        <van-field 
          v-else-if="field.options" 
          is-link
          readonly
          :name="field.name"
          :label="$t(field.label)"
          :label-width="labelWidth"
          :placeholder="field.placeholder"
          :model-value="String(field.value)"
          @click="openPicker(field)"
        />

        <van-field
          v-else-if="field.type"
          :type="field.type"
          v-model="field.value as string | number | undefined"
          :name="field.name"
          :label="$t(field.label)"
          :label-width="labelWidth"
          :placeholder="field.placeholder ? $t(field.placeholder) : ''"
          :rules="[{
            required: field.required,
            message: field.message ? $t(field.message) : ''
          }]"
          :autocomplete="field.autocomplete"
        />
      </template>
    </van-cell-group>

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker 
        :columns="pickerOptions"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <div v-if="props.buttonItems" :class="['button__menu', props.buttonClass]">
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

.d-flex-40 {
  display: flex;
 
  .van-button {
    width: 40%;
  }
}
</style>
