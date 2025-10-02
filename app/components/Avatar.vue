<script setup lang="ts">
import type{ UploaderFileListItem } from 'vant';
const { uploadFile } = useStorage();
const { updateUser } = useDataBase();
const authStore = useAuthStore();

const avatar_url = ref<UploaderFileListItem[]>([
  { url: authStore.userInfo.avatar_url }
]);

const onAfterRead = async (
  fileItem: UploaderFileListItem | UploaderFileListItem[]
) => {
  const file = fileItem as UploaderFileListItem;
  if (!file || !file.file) return;

  const url = await uploadFile(file, "icc_avatar");
  if (!url) throw "There is no url.";

  avatar_url.value = [{ url: url[0] }];
  const {data, error} = await updateUser(authStore.userId, {avatar_url: url[0]});
  if (error) throw error;
  if (!data) throw `there is no data`
  authStore.userInfo = {...authStore.userInfo, avatar_url: url[0]};
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
