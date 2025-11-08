<script setup lang="ts">
import type { PickerConfirmEventParams } from 'vant';
import type { MemebersRow, MemebersUpdate } from '~/types/supabase';

const memberStore = useMemberStore();
const router = useRouter();
const { updateUser } = useDataBase();
const { t } = useI18n();

const isDisabled = ref(true);
const showPickerGender = ref(false);
const showPickerDate = ref(false);

onMounted(async() => {
  memberInfo.value = memberStore.member as MemebersRow;
});

const memberInfo = ref<MemebersRow | MemebersUpdate>({
  avatar_url: '',
  birthday: '',
  club_group: '',
  club_role: '',
  created_at: '',
  created_by: '',
  department: '',
  email: '',
  gender: '',
  grade: '',
  hierarchy: '',
  id: '',
  instagram: '',
  inviter: '',
  join_date: '',
  line_id: '',
  name: '',
  phone: '',
  student_id: ''
});

const genderOptions = computed(() => {
  return [
    { text: t('male'), value: t('male') },
    { text: t('female'), value: t('female') },
  ]
});

const onSubmit = async () => {
  if (!memberStore.member || !memberStore.member.id) throw new Error("There is no user data or user id.");

  await updateUser(memberStore.member.id, memberInfo.value);
  memberStore.setMember(memberInfo.value);

  showSuccessToast({
    message: 'saved success!',
    onClose: () => router.push("/profile")
  });
};

const handleToggle = (action:string) => {
  switch(action) {
    case "gender":
      if (isDisabled.value === true) return;
      showPickerGender.value = !showPickerGender.value;
      break;
    case "date":
      if (isDisabled.value === true) return;
      showPickerDate.value = !showPickerDate.value;
    case "edit":
      isDisabled.value = !isDisabled.value;
      break;
    default:
      break;
  }
};

const onConfirmGender = ({ selectedValues }: PickerConfirmEventParams) => {
  showPickerGender.value = false;
  memberStore.setMember({'gender': selectedValues[0]?.toString()})
};

</script>

<template>
  <van-form @submit="onSubmit" :disabled="isDisabled">
    <van-cell-group inset>
      <Avatar></Avatar>
      <van-field
        v-model="memberInfo.name"
        :label="$t('name')"
        :placeholder="$t('Hints.enter_name')"
      />
      <van-field
        is-link
        readonly
        v-model="memberInfo.gender"
        :label="$t('gender')"
        :placeholder="$t('Hints.select_gender')"
        @click="handleToggle('gender')"
      />
      <van-popup
        v-model:show="showPickerGender"
        round
        position="bottom"
      >
        <van-picker
          :columns="genderOptions"
          @cancel="handleToggle('gender')"
          @confirm="onConfirmGender"
        />
      </van-popup>
      <van-field
        v-model="memberInfo.phone"
        :label="$t('phone')"
        :placeholder="$t('Hints.enter_phone')"
      />
      <van-field 
        v-model="memberInfo.email"
        :label="$t('email')"
        :placeholder="$t('Hints.enter_email')"
      />
      <van-field 
        v-model="memberInfo.department"
        :label="$t('department')"
        :placeholder="$t('Hints.enter_department')"
      />
      <van-field 
        v-model="memberInfo.grade"
        :label="$t('grade')"
        :placeholder="$t('Hints.enter_grade')"
      />
    </van-cell-group>
    <van-space class="button__container">
      <van-button round block type="primary" @click="handleToggle('edit')">{{ isDisabled ? $t("edit") : $t("cancel") }}</van-button>
      <van-button v-if="!isDisabled" round block type="primary" native-type="submit">{{ $t('submit') }}</van-button>
    </van-space>
  </van-form>
</template>

<style scoped lang="scss">
.van-popup--bottom {
  max-height: 320px;

  >ul >li {
    text-align: center;
  }
}
.van-search {
  width: 100%;
  height: 44px;
  padding: 0 20px;
}

.button__container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;

  :deep(.van-space-item) {
    width: 45%
  };
}
</style>
