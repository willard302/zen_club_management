import type { UserInsert, UserRow, UserUpdate } from "~/types/supabase";
export const useMainStore = defineStore('main', () => {

  const isAuthenticated = ref(false);
  const userInfo = ref<UserInsert | UserUpdate>({});
  const tabBarActive = ref('home');
  const locale = ref('tw');
  const showTabbar = ref(false);

  const avatarUrl = computed(() => {
    if (userInfo.value && userInfo.value.avatar_url) {
      return userInfo.value.avatar_url;
    }
  });

  const setAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  };
  const setTabbar = (value: boolean) => {
    showTabbar.value = value
  };
  const setUser = (
    user: Partial<UserRow> | Partial<UserUpdate>
  ) => {
    userInfo.value = {...userInfo.value, ...user};
  };
  const setTabBarActive = (active: string) => {
    tabBarActive.value = active;
  };
  const setLocale = (locale: string) => {
    locale = locale
  };
  const initAuth = () => {
    isAuthenticated.value = false;
    showTabbar.value = false;
    userInfo.value = {};
  };

  return {
    isAuthenticated,
    userInfo,
    tabBarActive,
    locale,
    showTabbar,
    avatarUrl,
    setAuthenticated,
    setTabbar,
    setUser,
    setTabBarActive,
    setLocale,
    initAuth
  }
  
}, {
  persist: true
}
  )