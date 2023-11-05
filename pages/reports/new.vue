<template>
  <div class="flex flex-col p-4">
    <div class="pixelop-font text-center text-4xl font-bold uppercase text-danger">
      New report
    </div>

    <SearchSection
      v-if="showSearch"
      :loading="searchLoading"
      :disabled="appInfo ? true : false"
      :show-clear="appInfo ? true : false"
      :input-value="searchInputValue"
      @clicked="handleSearch"
      @clear="handleClear"
    />

    <div v-if="searchLoading">
      <Loading />
    </div>

    <div
      v-if="appInfo"
      class="mt-8 flex flex-col"
    >
      <div class="flex items-center">
        <div>
          <img
            class="h-16 w-16"
            :src="appInfo.icon"
            referrerpolicy="no-referrer"
            :alt="appInfo.title"
          >
        </div>
        <div class="ml-4 flex grow flex-col">
          <div class="text-2xl font-bold">
            <a
              :href="appInfo.store_url"
              class="font-bold  text-gray-500 transition-all duration-200 ease-in-out hover:text-black"
              target="_blank"
            >
              {{ appInfo.title }}
            </a>
          </div>
          <div>
            <a
              :href="appInfo.dev_store_url"
              class="font-bold text-primaryDark transition-all duration-200 ease-in-out hover:text-primary"
              target="_blank"
            >
              {{ appInfo.dev_name }}
            </a>
          </div>
        </div>
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary p-2 text-sm font-bold text-white"
          :title="'rating: ' + appInfo.rating"
        >
          {{ appInfo.rating }}
        </div>
      </div>

      <div class="mt-8">
        <FmgTextarea
          v-model:inputValue="reportForm.comment"
          :rows="5"
          label="your comment"
          placeholder="The game is full of ads and their promo ads are misleading"
        />
      </div>

      <div class="mt-8 flex flex-col">
        <FmgCheckbox
          v-model:inputValue="reportForm.worksOffline"
          label="works offline"
        />
        <div class="text-sm text-gray-500">
          Check this if the app or game still loads and works correctly when the device is offline
        </div>
      </div>

      <div class="mt-8">
        <FmgInput
          v-model:inputValue="reportForm.fakeAd"
          label="fake ad (youtube ID)"
          placeholder="dQw4w9WgXcQ"
        />
      </div>

      <div class="my-8 flex justify-center">
        <FmgButton
          class="w-[200px]"
          :loading="submitLoading"
          text="submit"
          @click="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { search } from '~/helpers/storeService'
import { submit } from '~/helpers/reportService'
import { newReport } from '~/types/newReport'
import { storeSearch } from '~/types/storeSearch'

const { $showToast, $handleRequestError } = useNuxtApp()
const route = useRoute()

const showSearch = ref(true)
const searchLoading = ref(false)
const submitLoading = ref(false)
const searchInputValue = ref('')
const appInfo = ref<storeSearch>()
const reportForm = ref<newReport>({ storeId: '', worksOffline: false, fakeAd: '', comment: '' })

definePageMeta({
  middleware: ['auth']
})

onMounted(() => {
  if (route.query.id !== '' && route.query.id !== undefined) {
    handleSearch(route.query.id as string)
    showSearch.value = false
  }
})

const handleSearch = async (searchValue: string) => {
  if (!searchLoading.value) {
    searchLoading.value = true

    try {
      const searchResult: storeSearch = await search(searchValue)
      appInfo.value = searchResult
      reportForm.value.storeId = appInfo.value.store_id
    } catch (error) {
      $handleRequestError(error)
    } finally {
      searchLoading.value = false
    }
  }
}

const handleClear = () => {
  appInfo.value = undefined
  reportForm.value = { storeId: '', worksOffline: false, fakeAd: '', comment: '' }
}

const handleSubmit = async () => {
  if (!submitLoading.value) {
    submitLoading.value = true

    try {
      const submitResult: any = await submit(reportForm.value)
      $showToast([submitResult.message], 'success')

      await navigateTo('/')
    } catch (error) {
      $handleRequestError(error)
    } finally {
      submitLoading.value = false
    }
  }
}
</script>
