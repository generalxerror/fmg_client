<template>
  <div class="flex h-screen items-center justify-center">
    <div class="min-w-[300px] flex-col rounded-lg border border-gray-50 p-4 shadow-xl">
      <div
        v-if="!loading"
        class="text-center font-bold uppercase"
      >
        User Info
      </div>
      <FmgInput
        v-if="!loading"
        label="name"
        :input-value="user?.name"
        :disabled="true"
      />
      <FmgInput
        v-if="!loading"
        class="mt-4"
        label="email"
        :input-value="user?.email"
        :disabled="true"
      />
      <FmgButton
        :class="{'mt-8' : !loading}"
        :is-danger="true"
        :loading="loading"
        text="logout"
        @clicked="handleLogout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { logout } from '@/helpers/userService'
import { useUserStore } from '@/stores/user'

definePageMeta({
  middleware: ['auth']
})

const loading = ref(false)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const handleLogout = async () => {
  if (!loading.value) {
    loading.value = true
    try {
      const logoutData: any = await logout()
      console.log(logoutData)

      const cookieFmgToken = useCookie('fmg_token')
      const cookieFmgRToken = useCookie('fmg_r_token')

      cookieFmgToken.value = null
      cookieFmgRToken.value = null

      setTimeout(async () => {
        userStore.forgetUser()
        await navigateTo('/')
      }, 500)
    } catch (error) {
      console.log(error)
      loading.value = false
    }
  }
}
</script>
