<script setup lang="ts">
import type { ButtonType } from 'vant';

const props = defineProps<{
  id?: string,
  activity?: string
  amount?: number,
  remark?: string,
  date?: string,
  type: string,
  payer?: string,
  accountant?: string
}>();

const emit = defineEmits(['edit', 'delete']);

interface button {
  text: string
  type: ButtonType
};

const buttons = ref<button[]>([
  {text: "edit", type: "primary" },
  {text: "delete", type: "danger"}
]);

const content = computed(() => {
  return `${props.activity} - ${props.remark}`
})

const onClick = (event: string) => {
  switch(event) {
    case "edit":
      emit("edit", "edit");
      break;
    case "delete":
      emit("delete", props.id);
      break;
  }
};

const financialType = (type: string) => {
  return type === 'income' ? 'success' : 'danger';
}
</script>

<template>
  <van-swipe-cell>
    <div class="member__card">
      <div class="card__header">
        <van-row gutter="20">
          <van-col class="name" span="8">{{ date }}</van-col>
          <van-col class="label" span="8">
            <van-text-ellipsis 
              rows="2"
              :content="content" 
            />
          </van-col>
          <van-col span="8">
            <van-tag :type="financialType(type)" plain>{{ $t(type) }}</van-tag>
          </van-col>
        </van-row>
      </div>
      <div class="card__body">
        <van-row gutter="20">
          <van-col span="8">
            <van-tag>{{ $t("accountant") }}</van-tag>
            {{ accountant }}
          </van-col>
          <van-col span="8">
            <van-tag>{{ $t("payer") }}</van-tag>
            {{ payer }}
          </van-col>
          <van-col span="8">{{ amount }}</van-col>
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
          size="normal"
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

  .van-row {
    width: 100%;
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
