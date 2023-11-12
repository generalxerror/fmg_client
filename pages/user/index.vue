<template>
  <div class="flex w-full flex-col p-4">
    <div class="pixelop-font my-8 w-full text-center text-4xl font-bold uppercase text-danger">
      User Dashboard
    </div>

    <div class="flex items-center">
      <FmgInput
        v-if="!logoutLoading"
        class="mr-4 grow"
        label="name"
        :input-value="user?.name"
        :disabled="true"
      />
      <FmgInput
        v-if="!logoutLoading"
        class="mx-4 grow"
        label="email"
        :input-value="user?.email"
        :disabled="true"
      />
      <FmgButton
        class="ml-4 mt-4 grow"
        :is-danger="true"
        :loading="logoutLoading"
        text="logout"
        @clicked="handleLogout"
      />
    </div>

    <div class="pixelop-font mt-8 text-2xl font-bold uppercase text-danger">
      My reports ({{ totalReports }})
    </div>
    <div
      v-if="myReportsLoading"
    >
      <Loading />
    </div>

    <div
      v-else
      class="flex flex-col"
    >
      <div
        v-for="report in myReports"
        :key="report.id"
        class="my-2 flex flex-col"
      >
        <div class="rounded-lg border-2 border-danger bg-gray-100 p-2">
          <div class="flex flex-col">
            <div class="font-bold">
              <NuxtLink
                class="text-xl font-bold  text-gray-500 transition-all duration-200 ease-in-out hover:text-black"
                :to="`/app/${report.app_id}`"
              >
                {{ report.store_app.title }}
              </NuxtLink>
            </div>
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
        <div class="flex justify-between px-2">
          <div
            class="pixelop-font px-4 text-xl font-bold text-white"
            :class="report.published === 1 ? 'bg-primary' : (report.published === -1 ? 'bg-danger': 'bg-yellow-500')"
          >
            {{ publishedText(report.published) }}
          </div>
          <div class="text-sm text-gray-300">
            {{ format(new Date(report.created_at), 'MMM do, yyyy') }}
          </div>
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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import { logout } from '@/helpers/userService'
import { mine } from '@/helpers/reportService'
import { useUserStore } from '@/stores/user'
import { myReport } from '~/types/myReport'
import { getRequest } from '~/helpers/remoteService'

definePageMeta({
  middleware: ['auth']
})

const { $showToast, $handleRequestError } = useNuxtApp()
const logoutLoading = ref(false)
const myReportsLoading = ref(true)
const nextPageLoading = ref(false)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const myReports = ref<myReport[]>()
const nextPageUrl = ref<string | null>(null)
const totalReports = ref(0)

onMounted(async () => {
  try {
    const myReportsResult = await mine()
    myReports.value = myReportsResult.my_reports.data
    nextPageUrl.value = myReportsResult.my_reports.next_page_url
    totalReports.value = myReportsResult.my_reports.total
  } catch (error) {
    $handleRequestError(error)
  } finally {
    myReportsLoading.value = false
  }
})

const handleLogout = async () => {
  if (!logoutLoading.value) {
    logoutLoading.value = true
    try {
      const logoutData: any = await logout()
      $showToast([logoutData.message], 'success')

      const cookieFmgToken = useCookie('fmg_token')
      const cookieFmgRToken = useCookie('fmg_r_token')

      cookieFmgToken.value = null
      cookieFmgRToken.value = null

      setTimeout(async () => {
        userStore.forgetUser()
        await navigateTo('/')
      }, 500)
    } catch (error) {
      $handleRequestError(error)
      logoutLoading.value = false
    }
  }
}

const loadNextPage = async () => {
  if (!nextPageLoading.value) {
    nextPageLoading.value = true
    try {
      const nextPageResponse: any = await getRequest(nextPageUrl.value!)
      myReports.value!.push(...nextPageResponse.my_reports.data as myReport[])
      nextPageUrl.value = nextPageResponse.my_reports.next_page_url
    } catch (error) {
      $handleRequestError(error)
    } finally {
      nextPageLoading.value = false
    }
  }
}

const publishedText = (value: number) => {
  switch (value) {
    case 0:
      return 'In Review'
    case 1:
      return 'Published'
    default:
      return 'Rejected'
  }
}
</script>
