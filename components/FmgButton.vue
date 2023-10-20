<template>
  <div
    class="rounded-sm p-2 text-center font-bold uppercase transition-all duration-200 ease-in-out"
    :class="[
      props.disabled
        ? 'bg-gray-300 text-white'
        : (
          props.isDanger
            ? (props.loading ? 'bg-danger text-white' : 'bg-dangerDark text-white hover:bg-danger')
            : (props.loading ? 'bg-primary text-white' : 'bg-primaryDark text-white hover:bg-primary')
        ),
      (props.disabled || props.loading)
        ? 'cursor-default'
        : 'cursor-pointer'
    ]"
    @click="[(props.loading || props.disabled) ? null : $emit('clicked')]"
  >
    <div v-if="props.loading">
      <font-awesome-icon icon="fa-solid fa-circle-notch" spin />
    </div>
    <div
      v-else
      class="line-clamp-1"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isDanger: {
    type: Boolean,
    default: false
  }
})

defineEmits(['clicked'])
</script>
