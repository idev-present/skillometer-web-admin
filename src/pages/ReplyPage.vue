<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <BaseBreadcrumbs :pages="breadcrumbs"/>
    <main class="py-10">
      <!-- Page header -->
      <div
        class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <img class="h-16 w-16 rounded-full"
                   src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                   alt="" />
              <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ applicant?.title || 'Не указано' }}</h1>
            <div class="text-sm font-medium text-gray-500">{{ applicant?.searchStatus?.key }}
              <div v-if="applicant?.experience">· {{ applicant?.experience || '' }} </div>
            </div>
          </div>
        </div>
        <div
          class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">

          <StatusResolver
            :id="replyId"
            :options="replyStore.availableStatuses || []"
            :currentStatus="replyStore.currentReply.status"
            :model-value="replyStore.currentReply.statusEntity"
            @update:model-value="onChangeStatus"
          />
        </div>
      </div>

      <div
        class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
          <!-- Description list-->

        <ApplicantView />
          <div>
            <div class="sm:hidden">
              <label for="tabs" class="sr-only">Select a tab</label>
              <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
              <select id="tabs" name="tabs"
                      class="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500">
                <option v-for="tab in tabs" :key="tab.key" :selected="tab.current">{{ tab.value }}
                </option>
              </select>
            </div>
            <div class="sm:block">
              <div class="border-b border-gray-200">

                <nav
                  class="-mb-px mt-2 flex space-x-8 cursor-pointer overflow-y-auto" aria-label="Tabs">
                  <div
                    v-for="tab in tabs"
                    :key="tab.key"
                    :class="[tab.key === currentTab  ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700', 'whitespace-nowrap px-1 py-4 text-sm font-medium']"
                    @click="onTabClick(tab)"
                  >
                    {{ tab.name }}
                    <span v-if="tab.count"
                          :class="[tab.key === currentTab ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'ml-2 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block']">{{ tab.count
                      }}
                      </span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        <Notes
          v-if="currentTab==='comments'"
          :comments="replyStore.comments"
          :reply-id="replyId"

        />
          <Chat
          v-if="currentTab==='chat' && replyStore?.currentReply?.status"
          />
        </div>

        <TimelineForm/>
      </div>
    </main>
    <LoadingIndicator :visible="isLoading" />
  </div>
</template>


<script setup>

import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplicantStore } from '@/app/store/modules/applicant.js'
import TimelineForm from '@/widgets/TimelineForm.vue'
import ApplicantView from '@/pages/ApplicantView.vue'
import Notes from '@/widgets/Notes.vue'
import StatusResolver from '@/widgets/StatusResolver.vue'
import { useReplyStore } from '@/app/store/modules/reply.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import BaseBreadcrumbs from '@/shared/BaseBreadcrumbs.vue'
import Chat from '@/widgets/Chat.vue'

const route = useRoute()
const router = useRouter()

const replyStore = useReplyStore()

const applicantStore = useApplicantStore()

const applicant = ref(null)

const comments = ref([])

const onTabClick = (tab) => {
  router.push({ query: { tab: tab.key } })
}

const tabs = [
  { name: 'Комментарии', key: 'comments', current: false },
  { name: 'Чат с соискателем', key: 'chat', current: false },
]

const replyId = computed(() => {
  return route?.params?.id
})

const isLoading = computed(() => {
  return [
    replyStore.isLoading,
    applicantStore.isLoading,
  ].some((e) => !!e)
})

const currentTab = computed(() => {
  return route.query?.tab
})

const breadcrumbs = computed(() => {
  return [
    { name: 'Список вакансий', href: '/vacancies', current: false },
  ]
})

const getNextStatus = () => {
  if(!replyId.value) {
    console.error('reply id is not define')
    return null
  }
  replyStore.getReplyNextStatusFlow(replyId.value)
}

const onChangeStatus = (e) => {
}

onMounted(async() => {
  const tab = route?.query?.tab
  if(!tab) {
    router.push({ query: { tab: 'comments' } })
  }
  await getNextStatus()
  if(!replyId.value) {
    console.error('reply id is not define')
    return null
  }
  replyStore.getReply(replyId.value)
    .then((res) => {
      if(res?.applicantId) {
        applicantStore.getApplicant(res.applicantId)
          .then((res) => {
            applicant.value = res
          })
      } else {
        console.error('applicant id is not define')
      }

    })

  replyStore.getReplyComments(replyId.value)
})

</script>

<style scoped>

</style>