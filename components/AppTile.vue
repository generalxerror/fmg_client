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

      <div class="line-clamp-1 text-xs font-bold text-dangerDark">
        {{ props.devName }}
      </div>
      <!-- Latest review -->
      <div class="relative flex flex-col py-2">
        <div class="absolute left-1 top-2 flex justify-start text-xl text-danger">
          <font-awesome-icon :icon="['fas', 'quote-left']" />
        </div>
        <div class="rounded-lg border-2 border-danger bg-gray-100 p-4">
          <div class="line-clamp-4 text-sm">
            {{ props.review }}
          </div>
        </div>
        <div class="absolute bottom-2 right-1 flex justify-end text-xl text-danger">
          <font-awesome-icon :icon="['fas', 'quote-right']" />
        </div>
      </div>
      <!-- Review Date -->
      <div class="flex justify-end text-xs text-gray-300">
        {{ reviewDate }}
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
    required: true
  },
  review: {
    type: String,
    required: true
  },
  reviewDate: {
    type: String,
    required: true
  }
})

defineEmits(['clicked'])
</script>
