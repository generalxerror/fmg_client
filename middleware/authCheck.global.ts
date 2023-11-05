import { me } from '@/helpers/userService'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $showToast, $handleRequestError, $pinia } = useNuxtApp()
  const userStore = useUserStore($pinia)
  const globalStore = useGlobalStore($pinia)
  const cookieFmgToken = useCookie('fmg_token', { maxAge: 2629800 })
  const cookieFmgRToken = useCookie('fmg_r_token', { maxAge: 2629800 })
  const queryCode = to.query.code as string
  const queryRCode = to.query.rcode as string

  if (queryCode) {
    cookieFmgToken.value = queryCode
    cookieFmgRToken.value = queryRCode
  }

  userStore.authToken = cookieFmgToken.value
  userStore.authRToken = cookieFmgRToken.value

  if (userStore.authToken && userStore.authRToken && globalStore.loading) {
    try {
      const userData: any = await me()
      userStore.saveUser(userData.data)

      // We were redirected after login
      if (queryCode && queryRCode) {
        $showToast(['Welcome Back!'], 'success')
        return navigateTo('/user')
      }
    } catch (error) {
      $handleRequestError(error)
      userStore.forgetUser()
      cookieFmgToken.value = null
      cookieFmgRToken.value = null
    } finally {
      globalStore.loading = false
    }
  } else {
    globalStore.loading = false
  }
})
