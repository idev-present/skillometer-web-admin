<script setup>

import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon, XCircleIcon } from '@heroicons/vue/20/solid/index.js'
import { getLocalDate, getLocalDateTime } from './utils/getLocalDate.js'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { computed } from 'vue'
import UserAvatar from '@/app/assets/icons/SVG/UserAvatar.vue'
import SkillAssessment from '@/widgets/SkillAssessment.vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  imageUrl: {
    type: String,
    default: () => ""
  },
  name: {
    type: String,
    default: () => ""
  },
  email: {
    type: String,
    default: () => ""
  },
  status: {
    type: String,
    default: () => ""
  },
  appliedDatetime: {
    type: String,
    default: () => ""
  },
  applied: {
    type: String,
    default: () => ""
  },
  id: {
    type: String,
    default: () => ""
  },
  matchingResult: {
    type: Object,
    default: () => ({})
  },
})

const dictionaryStore = useDictionaryStore()

const fullStatus = computed(() => {
  return dictionaryStore.replyStatusList?.find((el) => el.key === props.status)
})

const colorByStatus = computed(() => {
  if(props.status === "DECLINED") {
    return 'text-red-600'
  } else {
    return 'text-green-400'
  }

})
</script>

<template>
  <RouterLink
    :to="`/reply/view/${id}`"
    class="group block"
  >
    <div class="flex items-center px-4 py-5 sm:px-0 sm:py-6">
      <div class="flex min-w-0 flex-1 items-center">
        <div class="flex-shrink-0">
<!--          <img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="imageUrl" alt="" />-->
          <UserAvatar classes="h-12 w-12 rounded-full group-hover:opacity-75 text-gray-400"/>
        </div>
        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-x-4">
          <div>
            <p class="truncate text-sm font-medium text-purple-600">{{ name }}</p>
            <p class="mt-2 flex items-center text-sm text-gray-500">
              <EnvelopeIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span class="truncate">{{ email }}</span>
            </p>
          </div>
          <div class="hidden md:block">
            <div>
              <p class="text-sm text-gray-900">
                Получен
                {{ ' ' }}
                <span>{{ getLocalDateTime(appliedDatetime)  }}</span>
              </p>
              <div v-if="props?.id === 'c8545042-8815-484d-8c52-c7cda414b37a'" class="mt-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                Отклик с HeadHunter
              </div>
              <p class="mt-2 flex items-center text-sm text-gray-500">
                <XCircleIcon v-if="status === 'DECLINED'" class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-600" aria-hidden="true" />
                <CheckCircleIcon v-else class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                {{ fullStatus?.value }}
              </p>
            </div>
          </div>
          <div class="hidden md:block">
          </div>
        </div>
      </div>
      <div class="flex items-center text-sm">
        <SkillAssessment
          :additional-skills="matchingResult?.additionalSkills || []"
          :missed-skills="matchingResult?.missedSkills || []"
          :coverage="matchingResult?.coverage || 0"
        />
      </div>
      <div>
          <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700 ml-10" aria-hidden="true" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
