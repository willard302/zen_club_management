<script setup lang="ts">
import facebookIcon from "~/assets/images/facebook.gif";
import instagramIcon from "~/assets/images/instagram.gif";
import { useCommon } from "~/composables/useCommon";
import type { Post } from "~/types/database.types";
const authStore = useAuthStore();
const router = useRouter();
const { getPost, getPosts, updatePost, deletePost } = useDataBase();
const { timeStampToString } = useCommon();

const isLoading = ref(false);
const isFinished = ref(false);
const showFavorite = ref(false);
const showOptions = ref(false);
const showShare = ref(false);
const showComment = ref(0);
const newComment = ref("");

const optionVal = ref<Post | null>(null);

const list = ref<Post[]>([]);
const currentClass = ref("all");
const optionLists = [
  { name: 'delete' }
];
const shareLists = reactive([
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Link', icon: 'link' }
]);

interface itemType {
  name: string,
  value: string
};

const items = reactive<itemType[]>([
  { name: 'all_posts', value: 'all' },
  { name: 'my_favorite', value: 'favorite' }
]);

const handleToggle = (item: itemType) => {
  currentClass.value = item.value;
  showFavorite.value = !showFavorite.value;
};

const sendFavorite = async(docId: number) => {
  type post = {
    id: number;
    trackers_id: string[]
  }

  const post = await getPost(docId, 'trackers_id');
  console.log(docId, post);

  const favoriteList = post?.trackers_id ?? [];

  if (Array.isArray(favoriteList)) {
  if (favoriteList.includes(authStore.userId)) {
    console.log("已經在收藏清單裡");
  } else {
    console.log("尚未收藏");
  }
}

  try {
    // const postFavorite = await getPost(docUid) as { data?: Post | null, error?: any };
    // if (postFavorite && postFavorite.data) console.log("start: ", postFavorite.data.id);
    // if (!postFavorite) {
    //   console.log('update')
    //   const newData = { 'trackers_id': [] };
    //   updatePost(docUid, newData);
    //   console.log(postFavorite)
    // } else {
    //   const newData = { 'trackers_id': [authStore.userId] };
    //   updatePost(docUid, newData);
    //   console.log('sendFavortie', postFavorite)
    //   // postFavorite.includes(authStore.userId)
    //   // ? updatePost(docUid, {trackers_id: arrayRemove(authStore.userId)})
    //   // : updatePost(docUid, {trackers_id: arrayUnion(authStore.userId)})
    // };
  } catch (error) {
    console.error('send failed: ', error)
  };
};

const sendComment = async(doc:any) => {
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

const onLoad = async() => {
  isLoading.value = true;
  await loadArticles();
  isLoading.value = false;
};

const loadArticles = async() => {
  if (isFinished.value) return;

  try {
    isLoading.value = true;

    if (!authStore.userId) return;
    const posts = await getPosts();
    if (posts.error) {
      console.error("Failed to fetch posts: ", posts.error);
    } else {
      list.value = posts.data || [];
      isFinished.value = true;
    };
    
    // const existingPostsMap = new Map(
    //   list.value.map(post => [post, post])
    // );
    
    // const newPosts = data.filter(post => !existingPostsMap.has(post.id));
    
    // newPosts.forEach(post => {
    //   post.favorite = post.trackers_id ? post.trackers_id.includes(authStore.userId.value) : false;
    //   post.comments = [];
    //   existingPostsMap.set(post.id, post);
    // });
    
    // list.value = Array.from(existingPostsMap.values());

    if (list.value && list.value.length !== 0) {
      list.value.forEach(post => {
        post.favorite = post.trackers_id ? post.trackers_id.includes(authStore.userId) : false;
        post.comments = []
      })
    }
  } catch (error) {
    console.error("Failed to load posts: ", error);
  } finally {
    isLoading.value = false;
  };
};

interface option {
  name: string
};

const onClickAction = async(option: option) => {
  switch(option.name) {
    case "delete":
      if(optionVal.value && typeof optionVal.value.id === 'number') {
        await deletePost(optionVal.value.id)
      }
      showOptions.value = false;
      break;
    default:
      break;
  };
  optionVal.value = null;
};

const onClickIcon = async(key: string, item: Post) => {
  switch (key) {
    case "favorite":
      item.favorite = !item.favorite;
      sendFavorite(item.id)
      break;
    case "comment":
      if (showComment.value === item.id) {
        showComment.value = 0;
        // stopWatcher("comment");
      } else {
        // if (showComment.value !== 0) stopWatcher("comment");
        showComment.value = item.id;
        // const unsubscribeComment = watchPostsComments(item.id, updateComment);
        // addWatcher("comment", unsubscribeComment);
      }
      break;
    case "share":
      showShare.value = true;
      break;
  }
};

const onSelect = (option: any) => {
  console.log(option)
  // showToast(option.name)
  showShare.value = false
};

const handleOpenOptions = (item: Post) => {
  optionVal.value = item ;
  showOptions.value = true;
};

const normalizeMessage = (message: any) => {
  if (!message) return message;
  return message.replace(/\r\n|\n/g, '\n')
};

</script>

<template>
  <div>
    <van-space class="activity__class">
      <van-button 
        type="primary" 
        @click="router.push('/newPost')"
      >
        {{ $t('build_post') }}
      </van-button>
      <van-button
        v-for="(item, idx) in items"
        :key="idx"
        :class="{'current': currentClass === item.value}"
        @click="handleToggle(item)"
      >{{ $t(item.name) }}</van-button>
    </van-space>
    <van-list
      :loading="isLoading"
      :finished="isFinished"
      finished-text="no more data"
      @load="onLoad"
    >
      <van-cell v-for="(item, idx) in list" :key="idx">
        <div v-show="showFavorite ? item.favorite : true" class="activity__container">
          <div class="activity__avatar">
            <div class="avatar__info">
              <van-image round :src="item.avatar_url" />
              <span class="activity__author">{{ item.author }}</span>
              <span>{{ timeStampToString(item.created_at) }}</span>
            </div>
            <template v-if="item.author_id === authStore.userId">
              <van-button class="avatar__menu" @click="handleOpenOptions(item)">
                <font-awesome :icon="['fas', 'ellipsis-vertical']" />
              </van-button>
            </template>
          </div>
          <div v-if="item.files" class="activity__media full-screen-x">
            <van-swipe :id="item.id">
              <van-swipe-item 
                v-for="(one, idx) of item.files" 
                :key="idx"
              >
                <img v-if="one.type.startsWith('image/')" :src="one.url" alt="">
                <video 
                  v-else 
                  controls
                  loop
                  preload="metadata"
                >
                  <source :src="one.url" :type="one.type">
                </video>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="activity__body">
            <van-action-bar class="activity__list">
              <van-action-bar-icon :icon="(item.favorite ? 'like' : 'like-o')" :text="$t('favorite')" @click="onClickIcon('favorite', item)" />
              <van-action-bar-icon icon="chat-o" :text="$t('messages')" @click="onClickIcon('comment', item)" />
              <van-action-bar-icon icon="share-o" :text="$t('share')" @click="onClickIcon('share', item)" />
            </van-action-bar>
            <div class="activity__content">
              <van-text-ellipsis 
                rows="3" 
                :content="normalizeMessage(item.content)" 
                expand-text="展开"
                collapse-text="收起" 
              />
            </div>
            <div v-show="showComment === item.id" class="activity__comment">
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
                <van-button @click="sendComment(item)">{{$t("submit")}}</van-button>
              </van-cell-group>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <van-share-sheet 
      v-model="showShare" 
      title="分享給" 
      :options="shareLists" 
      @select="onSelect" 
    />
    <van-action-sheet 
      v-model:show="showOptions"
      :cancel-text="$t('cancel')" 
      close-on-click-action
    >
      <ul class="action__sheet__options">
        <li v-for="(item, idx) of optionLists" :key="idx">
          <van-button @click="onClickAction(item)">{{ $t(item.name) }}</van-button>
        </li>
      </ul>
    </van-action-sheet>
  </div>
</template>

<style scoped lang="scss">
.van-space {
  position: fixed;
  top: 46px;
  left: 0px;
  z-index: 1;
  width: 100%;
  padding: 3% 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-bottom: 1px solid #f2f3f5;
  background-color: #ffffff;
}

.van-button {
  border: none;
}

:deep(.van-space-item) {
  flex: 1;

  img {
    width: 80px;

    @include PhoneL {
      width: 64px;
    }
  }

  .van-button {
    width: 100%;

    &.current {
      outline: 1px solid #1989fa;
      color: #1989fa;
    }
  }
}

.van-list {
  margin-top: 72px;
}

.van-cell {
  flex-direction: column;
  --van-cell-horizontal-padding: 0;

  :deep(.van-cell__value) {
    text-align: center;
  }

  :deep(.van-overlay) {
    opacity: 0.1;
  }
}

.activity__container {
  display: flex;
  flex-direction: column;
}

.activity__avatar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;

  .avatar__info {
    display: flex;
    align-items: center;
  }

  .activity__author {
    margin-right: 6px;
    font-weight: 700;
    font-size: 1rem;
  }

  :deep(.van-image) {
    margin-right: 10px;

    img {
      width: 48px;
      height: 48px;
    }
  }

  .avatar__menu {
    font-size: 18px;
  }
}

.activity__media {
  background: #000000;
  max-height: var(--base-media-height);
  overflow: hidden;

  :deep(.van-swipe__track) {
    align-items: center;
  }

  .van-swipe-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  video, img {
    width: auto;
    max-width: 100%;
    max-height: var(--base-media-height);
    object-fit: contain;
  }
}

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

.action__sheet__options {

  >li {
    width: 100%;
    text-align: center;
  }

  .van-button {
    color: #ee0a24;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
