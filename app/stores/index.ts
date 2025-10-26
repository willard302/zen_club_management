import type { MainStoreState } from "~/types/data.types";
import type { UserRow, UserUpdate } from "~/types/supabase";
export const useMainStore = defineStore('main', {
  state: (): MainStoreState => ({
    isAuthenticated: true,
    user: null,
    tabBarActive: 'home',
    defaultAvatar: "https://vvbtzvedcvhxibozbryz.supabase.co/storage/v1/object/public/icc_avatar/default_avatar.png"
  }),
  getters: {
    avatarUrl: (state) => state.user?.avatar_url ?? state.defaultAvatar
  },
  actions: {
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setUser(user: UserRow | UserUpdate) {
      this.user = user;
    },
    setTabBarActive(active: string){
      this.tabBarActive = active;
    },
    initAuth() {
      this.isAuthenticated = false;
      this.user = null;
    }
  },
  persist: true
})