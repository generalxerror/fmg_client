<template>
  <div v-if="loading">
    Loading
  </div>

  <div
    v-else
    class="noto-font flex min-h-screen flex-col items-center bg-white"
  >
    <TopNav />
    <div class="w-full max-w-contentMaxWidth grow">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
const { loading } = storeToRefs(globalStore)
</script>
