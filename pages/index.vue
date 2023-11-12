<template>
  <div v-if="loading">
    <Loading />
  </div>

  <div
    v-else
    class="flex flex-col p-4"
  >
    <div class="pixelop-font text-center text-6xl font-bold uppercase text-primary">
      Fair Mobile Games
    </div>

    <div class="pixelop-font text-center text-xl font-bold uppercase text-gray-400">
      Bringing shameless developers to shame
    </div>

    <ReportSection />

    <div class="my-4 h-0.5 w-full bg-gray-100" />

    <SearchSection
      :loading="searchLoading"
      :show-clear="searchResults !== null && searchResults.length > 0"
      :disabled="searchResults !== null && searchResults.length > 0"
      @clicked="handleSearch"
      @clear="clearResults"
    />

    <div v-if="searchLoading">
      <Loading />
    </div>

    <div
      v-else-if="searchResults !== null && searchResults.length > 0"
      class="flex flex-col"
    >
      <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
        Search Results
      </div>
      <div class="grid w-full grid-cols-1 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6">
        <AppTile
          v-for="app in searchResults"
          :key="app.id"
          :icon-url="app.icon"
          :title="app.title"
          :rating="app.rating"
          :dev-name="app.developer.name"
          :total-reports="app.reports_count"
          @clicked="showApp(app.id)"
        />
      </div>
    </div>
    <div
      v-else
      class="flex flex-col"
    >
      <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
        Latest Reports
      </div>
      <div
        v-if="latestReports.length > 0"
        class="grid w-full grid-cols-1 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6"
      >
        <AppTile
          v-for="report in latestReports"
          :key="report.id"
          :icon-url="report.store_app.icon"
          :title="report.store_app.title"
          :rating="report.store_app.rating"
          :dev-name="report.store_app.developer.name"
          :review="report.comment"
          :review-date="format(new Date(report.created_at), 'MMM do, yyyy')"
          @clicked="showApp(report.store_app.id)"
        />
      </div>
      <div
        v-else
        class="pixelop-font flex w-full items-center justify-center rounded-b-lg border-2 border-danger px-2 py-4 text-2xl uppercase text-gray-400"
      >
        Nothing here yet
      </div>

      <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
        Worst Apps
      </div>
      <div
        v-if="worstApps.length > 0"
        class="grid w-full grid-cols-1 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6"
      >
        <AppTile
          v-for="app in worstApps"
          :key="app.id"
          :icon-url="app.icon"
          :title="app.title"
          :rating="app.rating"
          :dev-name="app.developer.name"
          :total-reports="app.reports_count"
          @clicked="showApp(app.id)"
        />
      </div>
      <div
        v-else
        class="pixelop-font flex w-full items-center justify-center rounded-b-lg border-2 border-danger px-2 py-4 text-2xl uppercase text-gray-400"
      >
        Nothing here yet
      </div>

      <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
        Worst Devs
      </div>
      <div
        v-if="worstDevs.length > 0"
        class="grid w-full grid-cols-1 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6"
      >
        <DevTile
          v-for="dev in worstDevs"
          :key="dev.id"
          :dev-name="dev.name"
          :total-apps="dev.apps_count"
          :total-reports="dev.reports_count"
          @clicked="showDev(dev.id)"
        />
      </div>
      <div
        v-else
        class="pixelop-font flex w-full items-center justify-center rounded-b-lg border-2 border-danger px-2 py-4 text-2xl uppercase text-gray-400"
      >
        Nothing here yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { homePageItems } from '~/helpers/miscService'
import { searchApps } from '~/helpers/appService'
import { latestReport, worstApp, worstDev } from '~/types/misc'

const { $showToast, $handleRequestError } = useNuxtApp()
const loading = ref(true)
const searchLoading = ref(false)
const latestReports = ref<latestReport[] | []>([])
const worstApps = ref<worstApp[] | []>([])
const worstDevs = ref<worstDev[] | []>([])
const searchResults = ref<worstApp[] | null>(null)

onMounted(async () => {
  try {
    const pageItemsResult = await homePageItems()

    latestReports.value = pageItemsResult.latest_reports
    worstApps.value = pageItemsResult.worst_apps
    worstDevs.value = pageItemsResult.worst_devs
  } catch (error) {
    $handleRequestError(error)
  } finally {
    loading.value = false
  }
})

const handleSearch = async (searchValue: string) => {
  if (searchValue !== '' && !searchLoading.value) {
    try {
      const searchResponse = await searchApps(searchValue)

      if (searchResponse.search_result.length > 0) {
        searchResults.value = searchResponse.search_result
      } else {
        $showToast(['Nothing Found'], 'error')
      }
    } catch (error) {
      $handleRequestError(error)
    } finally {
      searchLoading.value = false
    }
  }
}

const clearResults = () => {
  searchResults.value = null
}

const showApp = (appId: number) => {
  navigateTo(`/app/${appId}`)
}

const showDev = (devId: number) => {
  navigateTo(`/developers/${devId}`)
}
</script>
