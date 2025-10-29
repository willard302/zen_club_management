export default defineNuxtRouteMiddleware((to, from) => {
  console.log("access middleware...")
  console.log(to, from)
})
