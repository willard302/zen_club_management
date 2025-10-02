export default defineNuxtRouteMiddleware((to, from) => {
  
  const authStore = useAuthStore();
  if (authStore.isAuthenticated && to.path === '/auth/login') return navigateTo('/');
  if (!authStore.isAuthenticated && to.path !== '/auth/login') return navigateTo('/auth/login');
  
  switch(to.path) {
    case "/": return authStore.setTabBarActive("home");
    case "/newFriends": return authStore.setTabBarActive("newFriends");
    case "/contact": return authStore.setTabBarActive("contact");
    case "/profile": return authStore.setTabBarActive("profile");
    default: return authStore.setTabBarActive("");
  };
})
