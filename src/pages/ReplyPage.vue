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

        <ApplicantView
          :applicant="applicant"
        />
        <Notes
          :comments="replyStore.comments"
          :reply-id="replyId"

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
import { useRoute } from 'vue-router'
import { useApplicantStore } from '@/app/store/modules/applicant.js'
import TimelineForm from '@/widgets/TimelineForm.vue'
import ApplicantView from '@/pages/ApplicantView.vue'
import Notes from '@/widgets/Notes.vue'
import StatusResolver from '@/widgets/StatusResolver.vue'
import { useReplyStore } from '@/app/store/modules/reply.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import BaseBreadcrumbs from '@/shared/BaseBreadcrumbs.vue'






const route = useRoute()

const replyStore = useReplyStore()

const applicantStore = useApplicantStore()

const applicant = ref(null)

const comments = ref([])

const replyId = computed(() => {
  return route?.params?.id
})

const isLoading = computed(() => {
  return [
    replyStore.isLoading,
    applicantStore.isLoading,
  ].some((e) => !!e)
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
    .then((res) => {
    })
}

const onChangeStatus = (e) => {
console.log(e)
}

onMounted(async() => {
  await getNextStatus()
  if(!replyId.value) {
    console.error('reply id is not define')
    return null
  }
  replyStore.getReply(replyId.value)
    .then((res) => {
      console.log('res', res)
      if(res?.applicantId) {
        applicantStore.getApplicant(res.applicantId)
          .then((res) => {
            console.log('res', res)
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