<script setup lang="ts">
import { useCommon } from "~/composables/useCommon";
import type { Post } from "~/types/database.types";
import CommentBox from "./components/CommentBox.vue";
const authStore = useAuthStore();
const router = useRouter();
const { getPost, getPosts, updatePost, deletePost } = useDataBase();
const { timeStampToString } = useCommon();

const isLoading = ref(false);
const isFinished = ref(false);
const showFavorite = ref(false);
const showOptions = ref(false);

const subNavs = ref<Post | null>(null);

const list = ref<Post[]>([]);
const currentClass = ref("all");
const optionLists = [
  { name: 'delete' }
];

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
        // post.comments = []
      })
    }
  } catch (error) {
    console.error("Failed to load posts: ", error);
  } finally {
    isLoading.value = false;
  };
};

const handleOpenSubNavs = (item: Post) => {
  subNavs.value = item ;
  showOptions.value = true;
};

interface option {
  name: string
};

const onClickAction = async(option: option) => {
  switch(option.name) {
    case "delete":
      if(subNavs.value && typeof subNavs.value.id === 'number') {
        await deletePost(subNavs.value.id)
      }
      showOptions.value = false;
      break;
    default:
      break;
  };
  subNavs.value = null;
};

const updateFavorite = async(updateData: Partial<Post>) => {
  const trackers = (await getPost(updateData.id as number, 'trackers_id')).trackers_id as string[]
  const trackerExist = trackers.includes(authStore.userId);
  let newTrackers: string[];
  if (trackerExist) {
    newTrackers = trackers.filter(id => id !== authStore.userId);
  } else {
    newTrackers = [...trackers, authStore.userId]
  };
  const result = await updatePost(updateData.id as number, {"trackers_id": newTrackers});
  
  showSuccessToast({
    message: 'success'
  });

  console.log(result)
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
              <van-button class="avatar__menu" @click="handleOpenSubNavs(item)">
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
          <CommentBox
            :post-id="item.id"
            :content="item.content" 
            :is-favorite="item.favorite"
            @update-favorite="updateFavorite"
          />
        </div>
      </van-cell>
    </van-list>
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
