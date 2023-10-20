import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(() => {
  const { $pinia } = useNuxtApp()
  const userStore = useUserStore($pinia)

  if (userStore.loggedIn) {
    return navigateTo('/user')
  }
})
