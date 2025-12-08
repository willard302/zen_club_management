<script setup lang="ts">
import { useStorage } from '~/composables/useStorage';
import { useDataBase } from '~/composables/useDataBase';
import type { UploaderFileListItem } from 'vant';
const { uploadFile, deleteFile } = useStorage();
const { updateUser, getUser } = useDataBase();
const mainStore = useMainStore();

const avatar_url = ref<UploaderFileListItem[]>([
  { url: mainStore.avatarUrl }
]);

const onAfterRead = async (
  fileItem: UploaderFileListItem | UploaderFileListItem[]
) => {
  if (!mainStore.user || !mainStore.user.id) throw `There is no user or userId.`;
  const user_id = mainStore.user.id;

  const user = await getUser(user_id);
  if (!user) return;
  const oldUrl = user.avatar_url;
  const file = fileItem as UploaderFileListItem;
  if (!file || !file.file) return;

  const newUrl = await uploadFile(file, "icc_avatar");
  if (!newUrl) throw "There is no url.";
  
  avatar_url.value = [{ url: newUrl[0] }];
  const data = await updateUser(user_id, {avatar_url: newUrl[0]});
  if (!data) throw `there is no data`;
  if (mainStore.user) {
    Object.assign(mainStore.user, {avatar_url: newUrl[0]})
  };

  if (!oldUrl) throw "There is no oldUrl.";
  await deleteFile([oldUrl], 'icc_avatar');
};

</script>

<template>
  <van-field name="uploader">
    <template #input>
      <van-uploader 
        v-model="avatar_url"
        :after-read="onAfterRead"
        preview-size="160px"
        :deletable="false"
        :show-upload="false"
        reupload
      />
    </template>
  </van-field>
</template>

<style scoped lang="scss">
:deep(.van-field__control) {
  justify-content: center;
}
:deep(.van-uploader__preview-image),
:deep(.van-uploader__upload) {
  border-radius: 50%;
  border: 1px solid rgb(192, 241, 255);
}
</style>
