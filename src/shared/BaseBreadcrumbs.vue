<template>
  <nav class="flex pb-8" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <RouterLink to="/" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </RouterLink>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <Component
            :is="page?.disabled ? 'span' : 'router-link'"
            :to="page.href"
            :class="[page?.disabled ? 'ml-4 text-sm font-medium text-gray-500' : 'ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer']"
            :aria-current="page.current ? 'page' : undefined">
            {{ page.name }}
          </Component>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  pages: {
    type: Array,
    default: () => []
  }
})

// const pages = [
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Project Nero', href: '#', current: true },
// ]
</script>
