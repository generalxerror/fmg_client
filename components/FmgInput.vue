<template>
  <div class="flex flex-col">
    <div
      v-if="props.label"
      class="text-xs font-bold uppercase text-gray-500"
    >
      {{ props.label }}
    </div>
    <div>
      <input
        ref="myInput"
        class="w-full rounded-sm border p-2 text-black outline-primary"
        :class="props.inputClass"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="props.inputValue"
        @input="valueChanged"
      >
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
  placeholder: {
    type: String,
    default: ''
  },
  inputValue: {
    type: [String, Boolean, Number],
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: String,
    default: ''
  }
})

const myInput = ref<HTMLElement | null>(null)
onMounted(() => {
  if (props.autofocus) {
    myInput.value?.focus()
  }
})

const valueChanged = (event: any) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:inputValue', (value))
  emit('valueChanged', (value))
}

const emit = defineEmits(['valueChanged', 'update:inputValue'])
</script>
