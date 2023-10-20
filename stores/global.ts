import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const loading = ref(true)

  return { loading }
})
