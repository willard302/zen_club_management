<script setup lang="ts">
import type { UploaderFileListItem } from 'vant';
import type { PostInsert } from '~/types/supabase';

const { uploadFile } = useStorage();
const { dateToString } = useCommon();
const { insertPost } = useDataBase();
const authStore = useAuthStore();

const postFiles = ref<UploaderFileListItem[]>([]);
const uploadFiles = ref<UploaderFileListItem[]>([]);
const uploadInfo = ref<PostInsert>({
  author: authStore.userInfo?.name,
  author_id: authStore.userId,
  avatar_url: authStore.userInfo?.avatar_url,
  content: '',
  created_at: dateToString(new Date(Date.now())),
  files: [],
  accessible_id: [authStore.userId],
  trackers_id: []
});

const onAfterRead = async(
  fileItem: UploaderFileListItem | UploaderFileListItem[]
) => {
  uploadFiles.value = Array.isArray(fileItem) ? fileItem : [fileItem];
};

const onSubmit = async() => {
  if (!uploadFiles.value || !uploadFiles.value.length) {
    showFailToast("Please select a file at least.");
    return;
  };

  showLoadingToast({message: "Loading...", duration: 0});
  try {
    const url = await uploadFile(uploadFiles.value, "icc_files");
    if (!url) throw "something error when uploading...";
    // uploadInfo.value.files = url.map(item => {
    //   const ext = item.split(".").pop();
    //   return {
    //     type: `image/${ext}`,
    //     url: item
    //   };
    // });
    // await insertPost(uploadInfo.value);
    showSuccessToast({message: "Post successfully."});
    setTimeout(() => navigateTo("/"), 2000);
  } catch (error) {
    showFailToast("Upload failed, please try it again.");
    console.error(error);
  } finally {
    closeToast();
  }
};

const resetFile = () => {
  console.log("reset")
  postFiles.value = [];
};
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field>
          <template #input>
            <van-uploader
              v-model="postFiles"
              accept="video/*, image/*"
              max-size="20971520"
              :after-read="onAfterRead"
              reupload
              multiple
            >
              <van-button type="primary">{{ $t("upload_file") }}</van-button>
            </van-uploader>
          </template>
        </van-field>
        <!-- <van-field
          class="message__content"
          v-model="uploadInfo.content"
          rows="3"
          autosize
          type="textarea"
          placeholder="請輸入內容"
        /> -->
      </van-cell-group>
      <van-space class="button__container">
        <van-button
          v-if="postFiles.length !== 0"
          round
          block
          type="primary"
          @click="resetFile"
        >
          {{ $t("reupload") }}
        </van-button>
        <van-button round block type="primary" native-type="submit">
          {{ $t("submit") }}
        </van-button>
      </van-space>
    </van-form>
  </div>
</template>

<style scoped lang="scss">

.van-form {
  overflow-y: scroll;
  margin-bottom: 60px;
}

.van-cell {
  --van-cell-horizontal-padding: 0;
}

:deep(.van-field__control--custom) {
  flex-wrap: wrap;
}

.van-uploader {
  width: 100%;

  :deep(.van-uploader__wrapper) {
    justify-content: center;
  }
}

:deep(.van-swipe__track) {
  align-items: center;
}

.message__content {
  margin: 10px auto;
}

.activity__media {
  background: #000000;
  max-height: var(--base-media-height);
  overflow: hidden;

  .van-swipe {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .van-swipe-item {
    display: flex;
    align-items: center;
  }

  video, img {
    width: auto;
    width: 100%;
    max-height: var(--base-media-height);
    object-fit: contain;
  }
}

.button__container {
  justify-content: center;
  width: 100%;
  margin-top: 10px;

  :deep(.van-space-item) {
    width: 100%;
    max-width: 360px;
  }
}
</style>

