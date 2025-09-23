<script setup lang="ts">
import { type UploaderFileListItem } from 'vant';
const { uploadFile } = useStorage();
const { updateUser } = useDataBase();
const authStore = useAuthStore();

const avatar_url = ref<UploaderFileListItem[]>([
  { url: authStore.userInfo.avatar_url }
]);

const onAfterRead = async (fileItem: any) => {
  const file = fileItem.file as File | undefined;
  if (!file) return;

  const url = await uploadFile(file, "icc_avatar");
  if (url) {
    avatar_url.value = [{ url }];
    updateUser(authStore.userId, {avatar_url: url})
  }
};

</script>

<template>
   <van-field name="uploader">
      <template #input>
        <van-uploader 
          v-model="avatar_url"
          :after-read="onAfterRead"
          preview-size="160px"
          reupload
          max-count="1"
          :deletable="false"
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
