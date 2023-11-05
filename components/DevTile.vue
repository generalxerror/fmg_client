<template>
  <div
    class="cursor-pointer rounded-lg border border-gray-100 p-2 transition-all duration-200 ease-in-out hover:shadow-xl"
    @click="$emit('clicked')"
  >
    <div class="flex flex-col">
      <div class="mt-2 line-clamp-1 text-center text-sm font-bold">
        {{ props.devName }}
      </div>
      <div
        class="mt-4 flex flex-col rounded-lg bg-dangerDark p-2 text-xs font-bold uppercase text-white"
      >
        <div>
          {{ props.totalReports }} Report{{ props.totalReports > 1 ? 's' : '' }}
        </div>
        <div>
          {{ props.totalApps }} App{{ props.totalApps > 1 ? 's' : '' }} reported
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  devName: {
    type: String,
    required: true
  },
  totalReports: {
    type: Number,
    required: true
  },
  totalApps: {
    type: Number,
    required: true
  }
})

defineEmits(['clicked'])
</script>
