<script setup lang="ts">
import type { ButtonType } from 'vant';

const props = defineProps<{
  type: string,
  name?: string
  club_role?: string
  birth?: string
  club_group?: string
  department?: string
}>();
const emit = defineEmits(['add', 'edit', 'delete']);

interface button {
  text: string
  type: ButtonType
};

const buttons = ref<button[]>([
  {text: "edit", type: "primary" },
  {text: "delete", type: "danger"}
]);

const onClick = (event: string) => {
  switch(event) {
    case "add":
      emit("add", "add");
      break;
    case "edit":
      emit("edit", "edit");
      break;
    case "delete":
      emit("delete", "delete");
      break;
  }
};

const roleType = (role:string) => {
  switch(role) {
    case "president":
      return "danger";
    default:
      return "primary";
  }
};
</script>

<template>
  <van-cell 
    v-if="props.type === 'add'" 
    class="card__header add" 
    is-link 
    @click="onClick('add')"
  >
    <template #title>
      <div class="custom__title">
        <font-awesome class="icon" :icon="['fas', 'square-plus']" />
        <div class="label">{{ "新增社員" }}</div>
      </div>
    </template>
  </van-cell>
  <van-swipe-cell 
    v-else-if="props.type === 'edit'"
  >
    <div class="member__card edit">
      <div class="card__header">
        <div class="name">{{ name }}</div>
        <van-tag v-if="club_role" :type="roleType(club_role)" plain>{{ club_role }}</van-tag>
      </div>
      <div class="card__body">
        <van-row gutter="20">
          <van-col span="8">{{ birth }}</van-col>
          <van-col span="8">{{ department }}</van-col>
          <van-col span="8">{{ club_group }}</van-col>
        </van-row>
      </div>
    </div>
    <template #right>
      <div class="card__footer">
        <van-button
          v-for="button in buttons"
          :key="button.text"
          :type="button.type"
          :text="button.text"
          size="small"
          square
          @click="onClick(button.text)"
        >
          {{ $t(button.text) }}
        </van-button>
      </div>
    </template>
  </van-swipe-cell>
  
</template>

<style scoped lang="scss">
.member__card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin: 6px 0;
  padding: 10px;
}
.card__header {
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 6px;

  &.add {
    --van-cell-horizontal-padding: 4px;
  }

  .name {
    margin-right: 20px;
  }

  .custom__title {
    display: flex;
    align-items: center;
    svg {
      font-size: 2.4rem;
      color: red;
      margin-right: 10px;
    }
  }
}
.card__footer {
  height: 100%;

  .van-button {
    height: 100%;
    border: 0;
    padding: 0 6px;
  }
}
</style>
