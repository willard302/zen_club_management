export default defineNuxtRouteMiddleware((to, from) => {
  
  const { logout } = useAuth();
  const mainStore = useMainStore();

  if (!mainStore.isAuthenticated || mainStore.userInfo === null) {
    console.log("not authenticated...")
    logout();
  }

  if (to.fullPath === '/') {
    return navigateTo('/home')
  };

  const isTabBarCorrect = to.path.includes(mainStore.tabBarActive);
  if (!isTabBarCorrect) {
    mainStore.setTabBarActive(to.href.split('/').join(''));
  };
  
})
