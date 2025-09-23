export default defineNuxtPlugin(nuxtApp => {
  setToastDefaultOptions({duration: 2000})
  setToastDefaultOptions('loading', {forbidClick: true})
})
