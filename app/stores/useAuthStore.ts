import { defineStore } from 'pinia';
import type { UserUpdate } from '~/types/database.types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false as boolean,
    userId: ' ' as string,
    userInfo: {} as UserUpdate,
    tabBarActive: 'home'
  }),
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
      this.userId = '';
      this.userInfo = {};
    }
  },
  persist: true
})