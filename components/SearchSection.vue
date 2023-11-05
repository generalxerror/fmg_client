<template>
  <div class="mt-8 flex items-center">
    <div class="grow">
      <input
        v-model="searchValue"
        :disabled="disabled"
        class="w-full rounded-l-full border px-4 py-2 font-bold text-black outline-primary"
        placeholder="App url or package Name"
        type="text"
        @keydown.enter="handleClick"
      >
    </div>
    <div
      v-if="!props.showClear"
      class="pixelop-font relative right-1 flex w-24 justify-center  rounded-r-full bg-primary text-xl font-bold uppercase leading-[42px] text-white transition-all duration-200 ease-in-out"
      :class="props.loading ? 'cursor-default shadow-lg' : 'cursor-pointer hover:shadow-lg'"
      @click="handleClick"
    >
      <div v-if="props.loading">
        <font-awesome-icon icon="fa-solid fa-circle-notch" spin />
      </div>
      <div v-else>
        search
      </div>
    </div>
    <div
      v-else
      class="pixelop-font relative right-1 flex w-24 cursor-pointer justify-center rounded-r-full  bg-danger text-xl font-bold uppercase leading-[42px] text-white transition-all duration-200 ease-in-out hover:shadow-lg"
      @click="handleClearClick"
    >
      clear
    </div>
  </div>
</template>

<script setup lang="ts">
const searchValue = ref()

const handleClick = () => {
  if (!props.loading) {
    emit('clicked', (searchValue.value))
  }
}

const handleClearClick = () => {
  emit('clear')
}

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['clicked', 'clear'])
</script>
