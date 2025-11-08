<script setup lang="ts">
definePageMeta({ title: 'user_data' });

import type { PickerConfirmEventParams } from 'vant';
import type { FieldItem } from '~/types/data.types';
import type { UserRow } from '~/types/supabase';

const mainStore = useMainStore();
const router = useRouter();
const { updateUser } = useDataBase();
const { t } = useI18n();

const isDisabled = ref(true);
const showPickerGender = ref(false);
const showPickerDate = ref(false);
const showPickerHierarchy = ref(false);
const showPickerRole = ref(false);
const showPickerGrade = ref(false);

const genderOptions = computed(() => {
  return [
    { text: t('male'), value: 'male' },
    { text: t('female'), value: 'female' },
  ]
});
const hierarchyOptions = computed(() => {
  return [
    { text: t('Hierarchy.core_officers'), value: 'core_officers' },
    { text: t('Hierarchy.officers'), value: 'officers' },
    { text: t('Hierarchy.members'), value: 'members' },
    { text: t('Hierarchy.associate_members'), value: 'associate_members' }
  ]
});
const clubRoleOptions = computed(() => {
  return [
    {text: t('Role.admin'), value: "admin",},
    {text: t('Role.teacher'), value: "teacher",},
    {text: t('Role.counselor'), value: "counselor",},
    {text: t('Role.president'), value: "president",},
    {text: t('Role.vice_president'), value: "vice_president",},
    {text: t('Role.team_director'), value: "team_director",},
    {text: t('Role.deputy_team_director'), value: "deputy_team_director",},
    {text: t('Role.committee_member'), value: "committee_member",},
    {text: t('Role.member'), value: "member",},
    {text: t('Role.new_member'), value: "new_member",},
    {text: t('Role.guest'), value: "guest",}
  ]
});
const gradeOptions = computed(() => {
  return [
    {text: t('Grade.freshman'), value: 'freshman'},
    {text: t('Grade.sophomore'), value: 'sophomore'},
    {text: t('Grade.junior'), value: 'junior'},
    {text: t('Grade.senior'), value: 'senior'},
    {text: t('Grade.graduate'), value: 'graduate'}
  ]
});

const fieldValue = (key: string, val:string) => {
  switch(key) {
    case 'grade':
      return t(`Grade.${val}`);
    case 'club_role':
      return t(`Role.${val}`);
    case 'gender':
      return t(val);
    case 'hierarchy':
      return t(`Hierarchy.${val}`)
    default:
      return val;
  }
}

const fields = computed(() => {
  let fields = [];
  for (const [key, val] of Object.entries(mainStore.user)){
    fields.push({
      label: key,
      value: fieldValue(key, val),
      name: key
    });
  };
  console.log(fields)

  const detailItems = ['id', 'created_at', 'created_by', 'avatar_url']
  const order = ["id", "email", "name", "gender", "birthday", "hierarchy", "club_role", "club_group", "student_id", "department", "grade", "phone", "instagram", "line_id", "inviter", "join_date", "created_at", "created_by"];

  fields.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  fields = fields.filter(field => !detailItems.includes(field.name));

  return fields;
});

const onSubmit = async () => {
  if (!mainStore.user || !mainStore.user.id) throw new Error("There is no user data or user id.");

  showLoadingToast({message: "Loading..."});

  await updateUser(mainStore.user.id, mainStore.user);

  showSuccessToast({
    message: 'saved success!',
    onClose: () => router.push("/profile")
  });
};

const handleToggle = (action:string) => {
  console.log(action)
  switch(action) {
    case "gender":
      if (isDisabled.value) return;
      showPickerGender.value = !showPickerGender.value;
      break;
    case "hierarchy":
      if (isDisabled.value) return;
      showPickerHierarchy.value = !showPickerHierarchy.value;
      break;
    case "club_role":
      if (isDisabled.value) return;
      showPickerRole.value = !showPickerRole.value
      break;
    case "grade":
      if (isDisabled.value) return;
      showPickerGrade.value = !showPickerGrade.value;
      break;
    case "date":
      if (isDisabled.value) return;
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
  mainStore.setUser({'gender': String(selectedValues[0])})
};
const onConfirmHierarchy = ({selectedValues}: PickerConfirmEventParams) => {
  showPickerHierarchy.value = false;
  mainStore.setUser({'hierarchy': String(selectedValues[0])})
};
const onConfirmClubRole = ({selectedValues}: PickerConfirmEventParams) => {
  showPickerRole.value = false;
  mainStore.setUser({'club_role': String(selectedValues[0])})
};
const onConfirmGrade = ({selectedValues}: PickerConfirmEventParams) => {
  showPickerGrade.value = false;
  mainStore.setUser({'grade': String(selectedValues[0])})
};

const onChangeData = (info: FieldItem) => {
  if (!info.value || !info.name) return;
  mainStore.setUser({[info.name]: String(info.value)} as Partial<UserRow>)
}

</script>

<template>
  <van-form @submit="onSubmit" :disabled="isDisabled">
    <van-cell-group inset>
      <Avatar />
      <template v-for="f in fields" :key="`${mainStore.user.name}-${f.name}`">

        <van-field 
          v-if="f.name === 'email'"
          v-model="(f.value as string)"
          :label="$t(f.label)"
          type="email"
          @change="onChangeData(f)"
        />
        <van-field 
          v-else-if="['gender', 'hierarchy', 'club_role', 'grade'].includes(f.name)"
          is-link
          readonly
          v-model="(f.value as string)"
          :label="$t(f.label)"
          @click="handleToggle(f.name)"
        />
        <van-field 
          v-else-if="f.name === 'birthday'"
          v-model="(f.value as string)"
          :label="$t(f.label)"
          type="date"
          @change="onChangeData(f)"
        />
        <van-field 
          v-else
          v-model="(f.value as string)"
          :label="$t(f.label)"
          @change="onChangeData(f)"
        />

        <van-popup
          v-if="f.name === 'gender'"
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
        <van-popup
          v-else-if="f.name === 'hierarchy'"
          v-model:show="showPickerHierarchy"
          round
          position="bottom"
        >
          <van-picker 
            :columns="hierarchyOptions"
            @cancel="handleToggle('hierarchy')"
            @confirm="onConfirmHierarchy"
          />
        </van-popup>
        <van-popup
          v-else-if="f.name === 'club_role'"
          v-model:show="showPickerRole"
          round
          position="bottom"
        >
          <van-picker 
            :columns="clubRoleOptions"
            @cancel="handleToggle('club_role')"
            @confirm="onConfirmClubRole"
          />
        </van-popup>
        <van-popup
          v-else-if="f.name === 'grade'"
          v-model:show="showPickerGrade" 
          round
          position="bottom"
        >
          <van-picker 
            :columns="gradeOptions"
            @cancel="handleToggle('grade')"
            @confirm="onConfirmGrade"
          />
        </van-popup>
      </template>
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
