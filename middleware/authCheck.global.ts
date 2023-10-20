import { me } from '@/helpers/userService'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $pinia } = useNuxtApp()
  const userStore = useUserStore($pinia)
  const globalStore = useGlobalStore($pinia)
  const cookieFmgToken = useCookie('fmg_token')
  const queryCode = to.query.code as string

  if (queryCode) {
    cookieFmgToken.value = queryCode
  }

  userStore.authToken = cookieFmgToken.value

  if (userStore.authToken && globalStore.loading) {
    try {
      const userData: any = await me()
      userStore.saveUser(userData.data)

      // We were redirected after login
      if (queryCode) {
        return navigateTo('/user')
      }
    } catch (error) {
      console.log(error)
      userStore.forgetUser()
      cookieFmgToken.value = null
    } finally {
      globalStore.loading = false
    }
  } else {
    globalStore.loading = false
  }
})
