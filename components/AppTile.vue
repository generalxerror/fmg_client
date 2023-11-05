<template>
  <div
    class="cursor-pointer rounded-lg border border-gray-100 p-2 transition-all duration-200 ease-in-out hover:shadow-xl"
    @click="$emit('clicked')"
  >
    <div class="flex flex-col">
      <div>
        <img
          :src="props.iconUrl"
          referrerpolicy="no-referrer"
          :alt="props.title"
        >
      </div>
      <!-- TITLE -->
      <div class="flex items-center justify-between pt-4 text-lg">
        <div
          class="line-clamp-1 grow pr-1 font-bold"
          :title="props.title"
        >
          {{ props.title }}
        </div>
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary p-2 text-sm font-bold text-white">
          {{ props.rating }}
        </div>
      </div>

      <div
        v-if="props.devName"
        class="line-clamp-1 text-xs font-bold text-dangerDark"
      >
        {{ props.devName }}
      </div>
      <!-- Latest review -->
      <div
        v-if="props.review"
        class="relative flex flex-col py-2"
      >
        <div class="absolute left-1 top-2 flex justify-start text-xl text-danger">
          <font-awesome-icon :icon="['fas', 'quote-left']" />
        </div>
        <div class="h-[100px] rounded-lg border-2 border-danger bg-gray-100 px-2 py-4">
          <div class="line-clamp-4 text-xs">
            {{ props.review }}
          </div>
        </div>
        <div class="absolute bottom-2 right-1 flex justify-end text-xl text-danger">
          <font-awesome-icon :icon="['fas', 'quote-right']" />
        </div>
      </div>
      <!-- Review Date -->
      <div
        v-if="props.reviewDate"
        class="flex justify-end text-xs text-gray-300"
      >
        {{ props.reviewDate }}
      </div>
      <!-- Total Reports -->
      <div
        v-if="props.totalReports"
        class="mt-4 rounded-lg bg-dangerDark p-2 text-center text-sm font-bold text-white"
      >
        {{ props.totalReports }} Report{{ props.totalReports > 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  iconUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  devName: {
    type: String,
    default: null
  },
  review: {
    type: String,
    default: null
  },
  reviewDate: {
    type: String,
    default: null
  },
  totalReports: {
    type: Number,
    default: null
  }
})

defineEmits(['clicked'])
</script>
