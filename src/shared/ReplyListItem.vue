<script setup>

import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon, XCircleIcon } from '@heroicons/vue/20/solid/index.js'
import { getLocalDate, getLocalDateTime } from './utils/getLocalDate.js'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { computed } from 'vue'

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
          <img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="imageUrl" alt="" />
        </div>
        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4 ">
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
              <p class="mt-2 flex items-center text-sm text-gray-500">
                <XCircleIcon v-if="status === 'DECLINED'" class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-600" aria-hidden="true" />
                <CheckCircleIcon v-else class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                {{ fullStatus?.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
          <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>