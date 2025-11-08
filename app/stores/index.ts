import type { MainStoreState } from "~/types/data.types";
import type { UserRow, UserUpdate } from "~/types/supabase";
export const useMainStore = defineStore('main', {
  state: (): MainStoreState => ({
    isAuthenticated: false,
    user: {},
    tabBarActive: 'home',
    defaultAvatar: "https://vvbtzvedcvhxibozbryz.supabase.co/storage/v1/object/public/icc_avatar/default_avatar.png",
    locale: 'tw',
    showTabbar: false
  }),
  getters: {
    avatarUrl: (state) => state.user?.avatar_url ?? state.defaultAvatar
  },
  actions: {
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setTabbar(value: boolean) {
      this.showTabbar = value
    },
    setUser(user: Partial<UserRow> | Partial<UserUpdate>) {
      this.user = {...this.user, ...user};
    },
    setTabBarActive(active: string){
      this.tabBarActive = active;
    },
    setLocale(locale: string) {
      this.locale = locale
    },
    initAuth() {
      this.isAuthenticated = false;
      this.showTabbar = false;
      this.user = {};
    }
  },
  persist: true
})