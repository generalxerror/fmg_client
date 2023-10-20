import { defineStore } from 'pinia'
import { userInfo } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<userInfo | null>(null)
  const authToken = ref<string | null | undefined>(null)
  const loggedIn = ref(false)

  function forgetUser () {
    user.value = null
    loggedIn.value = false
    authToken.value = null
  }

  function saveUser (userData: userInfo) {
    user.value = userData
    loggedIn.value = true
  }

  return { user, authToken, loggedIn, forgetUser, saveUser }
})
