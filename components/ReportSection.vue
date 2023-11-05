<template>
  <div class="pixelop-font mt-8 flex flex-col items-center text-lg font-bold uppercase">
    <div
      v-if="!appStoreId"
      class="text-center text-danger"
    >
      Found an <span class="font-bold underline">app</span> or <span class="font-bold underline">game</span>
      on the play store that is full of ads, barely usable or uses fake promotion ads?
    </div>
    <NuxtLink
      :to="`/reports/new${appStoreIdParam}`"
      class="mt-2 bg-danger px-8 py-2 text-white transition-all duration-200 ease-in-out hover:shadow-lg"
    >
      {{ props.text ? props.text : 'Report it here' }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  appStoreId: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: null
  }
})

const appStoreIdParam = computed((): string => {
  return props.appStoreId !== '' ? `?id=${props.appStoreId}` : ''
})
</script>
