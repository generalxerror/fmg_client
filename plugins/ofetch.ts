import { ofetch } from 'ofetch'
import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest ({ options }) {
      const config = useRuntimeConfig()
      const { $pinia } = useNuxtApp()
      const userStore = useUserStore($pinia)

      options.headers = {
        Accept: 'application/json'
      }

      if (userStore.authToken && userStore.authRToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${userStore.authToken}`,
          'X-Rt': userStore.authRToken
        }
      }

      options.baseURL = config.public.apiUrl + '/'
    },
    // onRequestError ({ error }) {
    //   console.error(error)
    // },
    onResponse ({ response }) {
      const { $pinia } = useNuxtApp()
      const userStore = useUserStore($pinia)

      const newToken = response._data.auth_token
      if (newToken) {
        const cookieFmgToken = useCookie('fmg_token', { maxAge: 2629800 })
        cookieFmgToken.value = newToken
        userStore.authToken = newToken
      }
    }
  })
})
