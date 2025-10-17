import { defineStore } from 'pinia';
import type { AuthState } from '~/types/auth.types';
import type { UserUpdate } from '~/types/supabase';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    userId: "0",
    userInfo: null,
    tabBarActive: 'home',
    defaultAvatar: 'https://vvbtzvedcvhxibozbryz.supabase.co/storage/v1/object/public/icc_avatar/default_avatar.png'
  }),
  getters: {
    avatarUrl: (state) => state.userInfo?.avatar_url ?? state.defaultAvatar
  },
  actions: {
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setUserId(id: string) {
      this.userId = id;
    },
    setUserInfo(info: UserUpdate) {
      this.userInfo = info;
    },
    setTabBarActive(active: string){
      this.tabBarActive = active;
    },
    initAuth() {
      this.isAuthenticated = false;
      this.userId = "0";
      this.userInfo = {};
    }
  },
  persist: true
})