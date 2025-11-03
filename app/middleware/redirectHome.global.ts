export default defineNuxtRouteMiddleware((to, from) => {
  const mainStore = useMainStore();
  if (to.fullPath === '/') {
    return navigateTo('/home')
  };
  const isTabBarCorrect = to.path.includes(mainStore.tabBarActive);
  if (!isTabBarCorrect) {
    mainStore.setTabBarActive(to.href.split('/').join(''));
  };
})
