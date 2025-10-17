<script setup lang="ts">
import facebookIcon from "~/assets/images/facebook.gif";
import instagramIcon from "~/assets/images/instagram.gif";
import type { PostComment, PostCommentInsert, PostCommentUpdate, PostUpdate } from "~/types/supabase";
const { timeStampToString, dateToString } = useCommon();

const props = defineProps<{
  postId: number
  content?: string
  isFavorite?: Boolean,
  comments?: PostComment[]
}>();
const emit = defineEmits<{
  (e: 'updateFavorite', value: PostUpdate): void,
  (e: 'updateComments', value: PostCommentUpdate): void
}>();

const isFavorite = ref(props.isFavorite)
const authStore = useAuthStore();
const showShare = ref(false);
const comments = ref(props.comments);
const showComment = ref("");
const newCommentContent = ref("");
const shareLists = reactive([
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Link', icon: 'link' }
]);

const onSelect = (option: any) => {
  showToast(option.name)
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
      emit("updateFavorite", {id: Number(props.postId), isFavorite: isFavorite.value as boolean});      
      break;
    case "comment":
      // if (showComment.value === props.postId) {
      //   showComment.value = "";
      // } else {
      //   showComment.value = props.postId;
      // };
      sendComment()
      break;
    case "share":
      showShare.value = true;
      break;
  }
};

const sendComment = async() => {
  if(newCommentContent.value.trim() === "") return;

  const newComment: PostCommentInsert = {
    post_id: props.postId,
    created_at: dateToString(new Date(Date.now())),
    author: "",
    author_id: authStore.userId,
    content: newCommentContent.value
  };
  
  emit("updateComments", newComment);

  newCommentContent.value = "";
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
      <div v-show="showComment === String(postId)" class="activity__comment">
        <van-divider>{{$t("comment")}}</van-divider>
        <ul class="comment__list">
          <li v-for="(comment, idx) of comments" :key="idx">
            <span>{{ timeStampToString(comment.created_at) }}</span>
            <span v-if="comment.author">｜</span>
            <span>{{ comment.author }}</span>
            <span v-if="comment.content">：</span>
            <span>{{ comment.content }}</span>
          </li>
        </ul>
        <van-cell-group class="comment__content" inset>
          <van-field 
            v-model="newCommentContent" 
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
      v-model:show="showShare" 
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
