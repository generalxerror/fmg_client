<template>
  <div v-if="loading">
    <Loading />
  </div>

  <div
    v-else
    class="flex flex-col p-4"
  >
    <div class="pixelop-font my-8 text-center text-4xl font-bold uppercase text-danger">
      App Information
    </div>
    <div class="flex items-center">
      <div>
        <img
          class="h-16 w-16"
          :src="storeApp!.app.icon"
          referrerpolicy="no-referrer"
          :alt="storeApp!.app.title"
        >
      </div>
      <div class="ml-4 flex grow flex-col">
        <div class="text-2xl font-bold">
          <a
            :href="storeApp!.app.store_url"
            class="font-bold  text-gray-500 transition-all duration-200 ease-in-out hover:text-black"
            target="_blank"
          >
            {{ storeApp!.app.title }}
          </a>
        </div>
        <div>
          <a
            :href="storeApp!.app.developer.store_url"
            class="font-bold text-primaryDark transition-all duration-200 ease-in-out hover:text-primary"
            target="_blank"
          >
            {{ storeApp!.app.developer.name }}
          </a>
        </div>
      </div>
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full bg-primary p-2 text-sm font-bold text-white"
        :title="'rating: ' + storeApp!.app.rating"
      >
        {{ storeApp!.app.rating }}
      </div>
    </div>

    <div class="mt-4 h-0.5 w-full bg-gray-100" />

    <ReportSection
      class="mt-1"
      text="report this app"
      :app-store-id="storeApp?.app.store_id"
    />

    <div class="mt-3 h-0.5 w-full bg-gray-100" />

    <div class="pixelop-font mt-8 text-2xl font-bold uppercase text-danger">
      Developer details
    </div>

    <div class="mt-2">
      <FmgInput
        label="name"
        disabled
        :input-value="storeApp!.app.developer.name"
      />
    </div>
    <div
      v-if="storeApp!.app.developer.website"
      class="mt-2"
    >
      <FmgInput
        label="website"
        disabled
        :input-value="storeApp!.app.developer.website"
      />
    </div>
    <div class="mt-2">
      <FmgInput
        label="email"
        disabled
        :input-value="storeApp!.app.developer.email"
      />
    </div>
    <div class="mt-2">
      <FmgInput
        label="PlayStore URL"
        disabled
        :input-value="storeApp!.app.developer.store_url"
      />
    </div>

    <div class="my-4 h-0.5 w-full bg-gray-100" />

    <div class="pixelop-font mt-8 text-2xl font-bold uppercase text-danger">
      Fake Ads
    </div>
    <div
      v-if="storeApp!.app.fake_ads.length > 0"
      class="grid w-full grid-cols-1 gap-4 rounded-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6"
    >
      <iframe
        v-for="fakeAd in storeApp!.app.fake_ads"
        :key="fakeAd.id"
        width="100%"
        height="200"
        :src="fakeAd.url"
        title="YouTube video player"
        frameborder="0"
        allowfullscreen
      />
    </div>
    <div
      v-else
      class="pixelop-font flex w-full items-center justify-center rounded-lg border-2 border-danger px-2 py-4 text-2xl uppercase text-gray-400"
    >
      Nothing here yet
    </div>

    <div class="my-4 h-0.5 w-full bg-gray-100" />

    <div class="pixelop-font mb-2 mt-8 flex flex-col text-2xl font-bold uppercase text-danger">
      <div>Reports ({{ totalReports }})</div>
      <div class="text-xl text-gray-500">
        {{ workOfflinePercentage }}% Works offline
      </div>
    </div>
    <div
      v-for="report in storeApp!.reports.data"
      :key="report.id"
      class="my-2 flex flex-col"
    >
      <div class="rounded-lg border-2 border-danger bg-gray-100 p-2">
        <div class="flex flex-col">
          <div class="flex items-center">
            <div
              v-if="report.works_offline"
              class="text-primary"
            >
              <font-awesome-icon :icon="['fas', 'circle-check']" />
            </div>
            <div
              v-else
              class="text-danger"
            >
              <font-awesome-icon :icon="['fas', 'circle-xmark']" />
            </div>
            <div
              class="pixelop-font ml-2 text-lg uppercase"
              :class="report.works_offline ? 'text-primary' : 'text-danger'"
            >
              {{ report.works_offline ? 'Works Offline' : 'doesn\'t work offline' }}
            </div>
          </div>
          <div>
            {{ report.comment }}
          </div>
        </div>
      </div>
      <div class="flex justify-end px-2 text-sm text-gray-300">
        {{ format(new Date(report.created_at), 'MMM do, yyyy') }}
      </div>
    </div>

    <div
      v-if="nextPageUrl"
      class="my-8"
    >
      <FmgButton
        text="Load More"
        :loading="nextPageLoading"
        @clicked="loadNextPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { getApp } from '~/helpers/appService'
import { appDetails } from '~/types/appDetails'
import { getRequest } from '~/helpers/remoteService'

const { $handleRequestError } = useNuxtApp()
const route = useRoute()
const loading = ref(true)
const nextPageLoading = ref(false)
const storeApp = ref<appDetails | null>()
const appId = route.params.id as string
const nextPageUrl = ref<string | null>(null)
const totalReports = ref(0)

onMounted(async () => {
  try {
    const appDetailsResult = await getApp(appId)
    storeApp.value = appDetailsResult

    nextPageUrl.value = appDetailsResult.reports.next_page_url
    totalReports.value = appDetailsResult.reports.total
  } catch (error) {
    $handleRequestError(error)
    navigateTo('/')
  } finally {
    loading.value = false
  }
})

const loadNextPage = async () => {
  if (!nextPageLoading.value) {
    nextPageLoading.value = true
    try {
      const nextPageResponse: any = await getRequest(nextPageUrl.value!)
      storeApp.value!.reports.data.push(...nextPageResponse.reports.data)
      nextPageUrl.value = nextPageResponse.reports.next_page_url
    } catch (error) {
      $handleRequestError(error)
    } finally {
      nextPageLoading.value = false
    }
  }
}

const workOfflinePercentage = computed((): string => {
  let totalWorking = 0
  let totalNotWorking = 0

  storeApp.value?.reports.data.forEach((report: any) => {
    if (report.works_offline) {
      totalWorking++
    } else {
      totalNotWorking++
    }
  })

  const totalReports = totalWorking + totalNotWorking

  return ((100 * totalWorking) / totalReports).toFixed(2)
})
</script>
