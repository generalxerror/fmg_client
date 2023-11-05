import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(() => {
  const { $showToast, $pinia } = useNuxtApp()
  const userStore = useUserStore($pinia)

  if (!userStore.loggedIn) {
    $showToast(['Please sign in first'], 'error')
    return abortNavigation()
  }
})
