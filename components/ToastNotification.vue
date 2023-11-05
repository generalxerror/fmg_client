<template>
  <div class="flex flex-col font-bold">
    <div
      v-for="(message, index) in props.messages"
      :key="index"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>
