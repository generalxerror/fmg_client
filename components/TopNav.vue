<template>
  <div class="sticky top-0 z-10 flex w-full items-center justify-between bg-white px-4 shadow-xl">
    <NuxtLink
      to="/"
    >
      <div class="flex items-center">
        <div>
          <img
            class="h-8"
            src="~assets/images/logo.png"
            alt="fair mobile games logo"
          >
        </div>
        <div class="p-4 font-bold text-gray-400">
          FairMobile.Games
        </div>
      </div>
    </NuxtLink>

    <div v-if="loggedIn">
      <NuxtLink to="/user">
        <img
          v-if="user?.avatar"
          class="h-8 rounded-full border border-primary"
          :src="user?.avatar"
          referrerpolicy="no-referrer"
        >
        <div
          v-else
          class="text-3xl text-primary"
        >
          <font-awesome-icon :icon="['fas', 'circle-user']" />
        </div>
      </NuxtLink>
    </div>

    <GAuthBtn v-else />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user, loggedIn } = storeToRefs(userStore)
</script>
