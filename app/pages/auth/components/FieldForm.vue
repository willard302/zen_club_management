<script setup lang="ts">
const props = defineProps<{
  fieldItems: any[],
  buttonItems: any[],
  onSubmit: (...args: any[]) => any
}>();
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-for="(fieldItem, fieldIdx) in props.fieldItems"
        :key="fieldIdx"
        :type="fieldItem.type"
        v-model="fieldItem.value"
        :name="fieldItem.name"
        :label="$t(fieldItem.label)"
        :placeholder="$t(fieldItem.placeholder)"
        :rules="[{
          required: fieldItem.required,
          message: $t(fieldItem.message)
        }]"
        :input-attrs="{ autocomplete: fieldItem.autocomplete }"
      />
    </van-cell-group>
    <div class="button__menu">
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
