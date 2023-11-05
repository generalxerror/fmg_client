<template>
  <div v-if="loading">
    <Loading />
  </div>

  <div
    v-else
    class="flex flex-col p-4"
  >
    <div class="pixelop-font my-8 text-center text-4xl font-bold uppercase text-danger">
      Developer Information
    </div>

    <div class="pixelop-font mt-8 text-2xl font-bold uppercase text-danger">
      Developer details
    </div>
    <div class="mt-2">
      <FmgInput
        label="name"
        disabled
        :input-value="developerInfo!.developer.name"
      />
    </div>
    <div class="mt-2">
      <FmgInput
        label="website"
        disabled
        :input-value="developerInfo!.developer.website"
      />
    </div>
    <div class="mt-2">
      <FmgInput
        label="email"
        disabled
        :input-value="developerInfo!.developer.email"
      />
    </div>
    <div class="mt-2">
      <FmgInput
        label="PlayStore URL"
        disabled
        :input-value="developerInfo!.developer.store_url"
      />
    </div>

    <div class="pixelop-font mt-8 text-2xl font-bold uppercase text-danger">
      Reported Apps
    </div>
    <div
      v-if="developerInfo!.apps.length > 0"
      class="grid w-full grid-cols-1 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6"
    >
      <AppTile
        v-for="app in developerInfo!.apps"
        :key="app.id"
        :icon-url="app.icon"
        :title="app.title"
        :rating="app.rating"
        :total-reports="app.reports_count"
        @clicked="showApp(app.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDeveloper } from '~/helpers/devService'
import { devDetails } from '~/types/devDetails'

const { $handleRequestError } = useNuxtApp()
const route = useRoute()
const loading = ref(true)
const developerInfo = ref<devDetails | null>()
const developerId = route.params.id as string

onMounted(async () => {
  try {
    const devDetailsResult = await getDeveloper(developerId)

    developerInfo.value = devDetailsResult
  } catch (error) {
    $handleRequestError(error)
    navigateTo('/')
  } finally {
    loading.value = false
  }
})

const showApp = (appId: number) => {
  navigateTo(`/app/${appId}`)
}
</script>
