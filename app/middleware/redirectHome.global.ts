export default defineNuxtRouteMiddleware((to, from) => {
  const mainStore = useMainStore();
  if (to.fullPath === '/') {
    return navigateTo('/home')
  };
  console.log(to.path.includes(mainStore.tabBarActive))
})
