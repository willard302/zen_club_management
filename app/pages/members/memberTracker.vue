<script setup lang="ts">
import type { ButtonItem, FieldItem, FieldOption, TrackerWithMember } from '~/types/data.types';
import MemberCard from './components/MemberCard.vue';
import type { TrackersInsert } from '~/types/supabase';

const { getMemberTrackers, insertMemberTracker, rmMemberTracker, getMembers } = useDataBase();

const mainStore = useMainStore();
const memberStore = useMemberStore();

const loading = ref(false);
const finished = ref(false);
const showNewMemberForm = ref(false);
const trackers = ref<TrackerWithMember[]>([]);
const options_members = ref<FieldOption[]>([]);

const fieldItems = ref<FieldItem[]>([
  {
    label: "name",
    value: "",
    name: "member_name",
    options: [],
    required: true
  },
  {
    label: "date",
    value: "",
    name: "contact_date",
    type: "date",
    required: true
  },
  {
    label: "status",
    value: "",
    name: "member_status",
    type: "textarea",
    required: true
  }
]);

const buttonItems: ButtonItem[] = [
  { text: "confirm", type: "submit" },
  { text: "cancel", type: "button", action: "cancel" }
];

const handleOpenNewPanel = () => {
  fieldItems.value.forEach(item => item.value = "");

  const dateField = fieldItems.value.find(f => f.name === 'contact_date');
  if (dateField) {
    dateField.value = new Date().toISOString().split('T')[0] as string;
  };
  showNewMemberForm.value = true;
};

const loadMembers = async() => {
  const members = await getMembers();
  options_members.value = members.map(m => ({
    text: m.name, 
    value: m.id,
    id: m.id
  }));

  const nameField = fieldItems.value.find(item => item.label === 'name');
  if (nameField) {
    nameField.options = [...options_members.value];
  };
};

const transformDateTime = (iso: string) => {
  if (!iso) return;
  const d = new Date(iso);
  return d.toISOString().slice(0, 16);
};

const loadMemberTrackers = async() => {
  loading.value = true;
  try {
    const trackerList = await getMemberTrackers();
    if (!trackerList) return;
    trackers.value = trackerList.map(t => ({
      ...t,
      created_at: transformDateTime(t.created_at || ""),
      member_status: t.member_status
    }));
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    finished.value = true;
  };
};

const fieldsToDatabase = (fields: FieldItem[]): TrackersInsert => {
  
  const tracker: any = {};
  fields.forEach(f => {
    tracker[f.name] = f.value;
  });

  return tracker as TrackersInsert;
};

const onSubmit = async() => {

  const formData: TrackersInsert = fieldsToDatabase(fieldItems.value);
  
  if (!formData.member_status) {
    showFailToast("請填寫完整資訊");
    return;
  };

  Object.assign(formData, {
    member_id: memberStore.memberPickerId,
    created_by: mainStore.user.name
  });

  try {
    await insertMemberTracker(formData);
    showSuccessToast("新增成功");
    showNewMemberForm.value = false;
    finished.value = false;
  } catch (error) {
    console.error(error);
  }
};

const onDelete = async(tracker_id: string) => {
  const result = await rmMemberTracker(tracker_id);
  if(result !== 204) return;
  showSuccessToast({message: "member delete successfully."});
  await loadMemberTrackers();
};

const handleOnClick = async(event: string) => {
  if (event === 'cancel') {
    showNewMemberForm.value = false
  };
};

onMounted(() => {
  loadMembers()
});

</script>

<template>
  <div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMemberTrackers"
    >
      <MemberCard
        v-for="tracker in trackers"
        :key="tracker.id"
        :id="tracker.id"
        type="tracker"
        :name="tracker.members?.name"
        :birth="tracker.members?.birthday"
        :member_status="tracker.member_status"
        :created_at="tracker.created_at"
        @delete="onDelete"
      />
    </van-list>
    <van-floating-bubble icon="plus" @click="handleOpenNewPanel" />
    <van-popup 
      v-model:show="showNewMemberForm" 
      position="bottom"
      round
    >
      <FieldForm
        custom-class="members" 
        :field-items="fieldItems"
        :button-items="buttonItems"
        button-class="d-flex-40"
        @submit="onSubmit"
        @button="handleOnClick"
      />
    </van-popup>
  </div>
</template>

<style scoped></style>
