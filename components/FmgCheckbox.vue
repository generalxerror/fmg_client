<template>
  <div class="flex w-full items-center font-bold uppercase">
    <div
      class="cursor-pointer text-primary "
      @click="$emit('update:inputValue', !props.inputValue)"
    >
      <font-awesome-icon
        v-if="props.inputValue"
        :icon="['fas', 'square-check']"
      />

      <font-awesome-icon
        v-else
        :icon="['far', 'square']"
      />
    </div>
    <div class="ml-2">
      {{ props.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputValue: {
    type: Boolean,
    required: true
  },
  inputClass: {
    type: String,
    default: ''
  }
})

defineEmits(['update:inputValue'])
</script>
