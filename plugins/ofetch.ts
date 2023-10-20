import { ofetch } from 'ofetch'
import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest ({ request, options }) {
      const config = useRuntimeConfig()
      const { $pinia } = useNuxtApp()
      const userStore = useUserStore($pinia)

      options.headers = {
        Accept: 'application/json'
      }

      if (userStore.authToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${userStore.authToken}`
        }
      }

      options.baseURL = config.public.apiUrl + '/'
    },
    // onRequestError ({ error }) {
    //   console.error(error)
    // },
    onResponse ({ request, response, options }) {
      const { $pinia } = useNuxtApp()
      const userStore = useUserStore($pinia)

      const newToken = response._data.auth_token
      if (newToken) {
        const cookieFmgToken = useCookie('fmg_token')
        cookieFmgToken.value = newToken
        userStore.authToken = newToken
      }
    }
  })
})
