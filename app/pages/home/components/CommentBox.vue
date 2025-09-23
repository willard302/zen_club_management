<script setup lang="ts">
import facebookIcon from "~/assets/images/facebook.gif";
import instagramIcon from "~/assets/images/instagram.gif";
import type { Post } from "~/types/database.types";
const { getPost } = useDataBase();

const props = defineProps<{
  postId: number
  content?: string
  postFavorite?: Boolean
}>();
const emit = defineEmits<{
  (e: 'updateFavorite', value: Partial<Post>): void
}>();

const isFavorite = ref(props.postFavorite)
const authStore = useAuthStore();
const showShare = ref(false);
const showComment = ref(0);
const newComment = ref("");
const shareLists = reactive([
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Link', icon: 'link' }
]);

const sendComment = async() => {
  if(newComment.value.trim() === "") return;

  const docData = {
    sender: authStore.userInfo.name,
    senderId: authStore.userId,
    content: newComment.value,
    created_at: Date.now()
  };

  // await createPostComment(doc.id, docData)
  newComment.value = "";
};

const onSelect = (option: any) => {
  console.log(option)
  // showToast(option.name)
  showShare.value = false
};

const normalizeMessage = (message: any) => {
  if (!message) return message;
  return message.replace(/\r\n|\n/g, '\n')
};

const onClickIcon = async(key: string) => {
  switch (key) {
    case "favorite":
      isFavorite.value = !isFavorite.value;
      emit("updateFavorite", {id: props.postId, favorite: isFavorite.value as boolean});      
      break;
    case "comment":
      if (showComment.value === props.postId) {
        showComment.value = 0;
        // stopWatcher("comment");
      } else {
        // if (showComment.value !== 0) stopWatcher("comment");
        showComment.value = props.postId;
        // const unsubscribeComment = watchPostsComments(item.id, updateComment);
        // addWatcher("comment", unsubscribeComment);
      }
      break;
    case "share":
      showShare.value = true;
      break;
  }
};
</script>

<template>
  <div>
    <div class="activity__body">
      <van-action-bar class="activity__list">
        <van-action-bar-icon :icon="(isFavorite ? 'like' : 'like-o')" :text="$t('favorite')" @click="onClickIcon('favorite')" />
        <van-action-bar-icon icon="chat-o" :text="$t('messages')" @click="onClickIcon('comment')" />
        <van-action-bar-icon icon="share-o" :text="$t('share')" @click="onClickIcon('share')" />
      </van-action-bar>
      <div class="activity__content">
        <van-text-ellipsis 
          rows="3" 
          :content="normalizeMessage(content)" 
          expand-text="展开"
          collapse-text="收起" 
        />
      </div>
      <div v-show="showComment === postId" class="activity__comment">
        <van-divider>{{$t("comment")}}</van-divider>
        <!-- <ul class="comment__list">
          <li v-for="(one, idx) of item.comments" :key="idx">
            {{ one }}
            <span>{{ timeStampToString(one.created_at) }}</span>
            <span v-if="one.sender">｜</span>
            <span>{{ one.sender }}</span>
            <span v-if="one.content">：</span>
            <span>{{ one.content }}</span>
          </li>
        </ul> -->
        <van-cell-group class="comment__content" inset>
          <van-field 
            v-model="newComment" 
            autosize 
            type="textarea" 
            maxlength="200" 
            :placeholder="$t('Hints.enter_comment')"
            show-word-limit 
          />
          <van-button @click="sendComment()">{{$t("submit")}}</van-button>
        </van-cell-group>
      </div>
    </div>
    <van-share-sheet 
      v-model="showShare" 
      title="分享給" 
      :options="shareLists" 
      @select="onSelect" 
    />
  </div>
</template>

<style scoped lang="scss">
  .activity__list {
    position: relative;

    :deep(.van-icon-like) {
      color: #ee0a24;
    }
  }
  .activity__content {
    text-align: left;
    padding: 0 10px;
  }
  .activity__comment {
    .comment__list {
      padding: 0 10px;
  
      li {
        text-align: left;
      }
    }
    .comment__content {
      button {
        width: 100%;
      }
    }
  }
</style>
