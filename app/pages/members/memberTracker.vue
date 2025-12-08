<script setup lang="ts">
import type MemberCardVue from './components/MemberCard.vue';
import MemberCard from './components/MemberCard.vue';
import type { TrackersInsert } from '~/types/supabase';

const { getMemberTrackers, getMember } = useDataBase();
  
const mainStore = useMainStore();
const memberStore = useMemberStore();

const loading = ref(false);
const finished = ref(true);
const showNewMemberForm = ref(false);
const trackers = ref<TrackersInsert[]>([]);

onMounted(() => {
  loadMembers()
})

const handleOpenNewPanel = () => {
  showNewMemberForm.value = true;
};

const loadMembers = async() => {
  if (!mainStore.user || !mainStore.user.id) throw new Error(`There is no user.`);
  const trackerList = await getMemberTrackers();
  if (trackerList && trackerList.length !== 0) {
    trackers.value = trackerList;
  };
  finished.value = true;
};

const onEdit = async(item: string) => {

  
};

const onDelete = async(member_id: string) => {
  // const result = await rmMember(member_id);
  // if(result !== 204) return;
  showSuccessToast({message: "member delete successfully."});
  await loadMembers();
};

</script>

<template>
  <div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMembers"
    >
      <MemberCard
        v-for="tracker in trackers"
        :key="tracker.id"
        type="tracker"
        :name="tracker.member_name"
      />
    </van-list>
    <van-floating-bubble icon="plus" @click="handleOpenNewPanel" />
  </div>
</template>

<style scoped></style>
