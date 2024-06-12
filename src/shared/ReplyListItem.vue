<script setup>

import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from '@heroicons/vue/20/solid/index.js'

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
</script>

<template>
  <a href="#" class="group block">
    <div class="flex items-center px-4 py-5 sm:px-0 sm:py-6">
      <div class="flex min-w-0 flex-1 items-center">
        <div class="flex-shrink-0">
          <img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="imageUrl" alt="" />
        </div>
        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
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
                Applied on
                {{ ' ' }}
                <time :datetime="appliedDatetime">{{ applied }}</time>
              </p>
              <p class="mt-2 flex items-center text-sm text-gray-500">
                <CheckCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                {{ status }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RouterLink :to="`/reply/view/${id}`">
          <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </a>
</template>

<style scoped>

</style>