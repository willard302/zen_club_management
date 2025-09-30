import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig>{
  routes: (routes) => {
    return routes.map((route) => {
      if (route.path === '/home') {
        return {...route, path:'/'}
      }
      return route;
    })
  }
}