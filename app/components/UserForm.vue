<script setup lang="ts">
import type { PickerConfirmEventParams } from 'vant';
import type { FieldItem } from '~/types/data.types';
import type { UserInsert, UserRow, UserUpdate } from '~/types/supabase';
const {t} = useI18n();

const props = defineProps<{
  userData: UserInsert | UserUpdate,
  editable: boolean
}>();
const emit = defineEmits(['update', 'submit', 'editable']);

const order = [
  "id", "email", "name", "gender", "birthday", "hierarchy", "club_role", "club_group", "student_id", "department", "grade", "phone", "instagram", "line_id", "inviter", "join_date", "created_at", "created_by"
];
const hideItems = ['id', 'created_at', 'created_by', 'avatar_url'];
const pickerOptions = {
  gender: [
    { text: t('male'), value: 'male' },
    { text: t('female'), value: 'female' },
  ],
  hierarchy: [
    { text: t('Hierarchy.core_officers'), value: 'core_officers' },
    { text: t('Hierarchy.officers'), value: 'officers' },
    { text: t('Hierarchy.members'), value: 'members' },
    { text: t('Hierarchy.associate_members'), value: 'associate_members' }
  ],
  club_role: [
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
  ],
  grade: [
    {text: t('Grade.freshman'), value: 'freshman'},
    {text: t('Grade.sophomore'), value: 'sophomore'},
    {text: t('Grade.junior'), value: 'junior'},
    {text: t('Grade.senior'), value: 'senior'},
    {text: t('Grade.graduate'), value: 'graduate'}
  ],
  date:[]
};

const showPickerGender = ref(false);
const showPickerDate = ref(false);
const showPickerHierarchy = ref(false);
const showPickerRole = ref(false);
const showPickerGrade = ref(false);
const localUser = ref({...props.userData});
const fields = ref<FieldItem[]>([]);

const fieldValue = (key: string, val: string) => {
  if (!val) return '';
  switch (key) {
    case 'grade': return t(`Grade.${val}`);
    case 'club_role': return t(`Role.${val}`);
    case 'gender': return t(val);
    case 'hierarchy': return t(`Hierarchy.${val}`);
    default: return val;
  };
};
const loadFields = (user:UserInsert) => {
  const newFields = Object.entries(user)
    .filter(([key]) => !hideItems.includes(key))
    .map(([key, val]) => ({
      label: key,
      value: fieldValue(key, val),
      name: key
    }));
  
  fields.value = newFields.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
};
const onChangeData = (info: FieldItem) => {
  if (!info.name) return;
  const updateData = { [info.name]: info.value ?? '' } as Partial<UserRow>
  localUser.value = {...localUser.value, ...updateData}
  loadFields(localUser.value)
};
const onConfirmPicker = (
  key: keyof UserInsert, 
  {selectedValues}: PickerConfirmEventParams
) => {
  const newData = { [key]: String(selectedValues[0]) } as Partial<UserInsert>;
  localUser.value = { ...localUser.value, ...newData };
  showPickerGender.value = showPickerHierarchy.value = showPickerRole.value = showPickerGrade.value = false;
  loadFields(localUser.value);
};
const onSubmit = () => {
  emit('submit', localUser.value);
};
const toggleEdit = () => {
  if( props.editable ) {
    localUser.value = props.userData
    loadFields(localUser.value)
  };
  emit('editable', props.editable ? false : true); 
};
const handleToggle = (action: string) => {
  if (!props.editable) return;
  switch(action) {
    case "gender":
      showPickerGender.value = !showPickerGender.value;
      break;
    case "hierarchy":
      showPickerHierarchy.value = !showPickerHierarchy.value;
      break;
    case "club_role":
      showPickerRole.value = !showPickerRole.value
      break;
    case "grade":
      showPickerGrade.value = !showPickerGrade.value;
      break;
    case "date":
      showPickerDate.value = !showPickerDate.value;
    default:
      break;
  }
};

onMounted(() => {
  loadFields(localUser.value)
});

</script>

<template>
  <van-form @submit="onSubmit" :disabled="!editable">
    <van-cell-group inset>
      <Avatar />

      <template v-for="f in fields" :key="`${localUser.name}-${f.name}`">
        <van-field
          v-if="['gender', 'hierarchy', 'club_role', 'grade'].includes(f.name)"
          is-link
          readonly
          v-model="(f.value as string)"
          :label="$t(f.label)"
          @click="handleToggle(f.name)" 
        />
        <van-field 
          v-else-if="f.name === 'email'"
          type="email"
          v-model="(f.value as string)"
          :label="$t(f.label)"
          @update:model-value="val => onChangeData({...f, value: val})"
        />
        <van-field 
          v-else-if="['birthday', 'join_date'].includes(f.name)"
          type="date"
          v-model="(f.value as string)"
          :label="$t(f.label)"
          @update:model-value="val => onChangeData({...f, value: val})"
        />
        <van-field 
          v-else
          v-model="(f.value as string)"
          :label="$t(f.label)"
          @update:model-value="val => onChangeData({...f, value: val})"
        />

        <van-popup
          v-if="f.name === 'gender'"
          v-model:show="showPickerGender"
          round
          position="bottom"
        >
          <van-picker 
            :columns="pickerOptions.gender"
            @confirm="params => onConfirmPicker('gender', params)"
          />
        </van-popup>
        <van-popup
          v-else-if="f.name === 'hierarchy'"
          v-model:show="showPickerHierarchy"
          round
          position="bottom"
        >
          <van-picker 
            :columns="pickerOptions.hierarchy"
            @confirm="params => onConfirmPicker('hierarchy', params)"
          />
        </van-popup>
        <van-popup
          v-else-if="f.name === 'club_role'"
          v-model:show="showPickerRole"
          round
          position="bottom"
        >
          <van-picker 
            :columns="pickerOptions.club_role"
            @confirm="params => onConfirmPicker('club_role', params)"
          />
        </van-popup>
        <van-popup
          v-else-if="f.name === 'grade'"
          v-model:show="showPickerGrade" 
          round
          position="bottom"
        >
          <van-picker 
            :columns="pickerOptions.grade"
            @confirm="params => onConfirmPicker('grade', params)"
          />
        </van-popup>

      </template>
    </van-cell-group>

    <van-space class="button__container">
      <van-button
        round
        block
        type="primary"
        @click.prevent="toggleEdit"
      >
        {{ !props.editable ? $t("edit") : $t("cancel") }}
      </van-button>
      <van-button
        v-if="props.editable"
        round
        block
        type="primary"
        native-type="submit"
      >
        {{ $t("submit") }}
      </van-button>
    </van-space>
  </van-form>
</template>

<style scoped lang="scss">
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
