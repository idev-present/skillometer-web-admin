<script setup>
import { computed, ref } from 'vue'
import { ChartPieIcon } from '@heroicons/vue/20/solid/index.js'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'

const props = defineProps({
  missedSkills: {
    type: Array,
    default: () => []
  },
  additionalSkills: {
    type: Array,
    default: () => []
  },
  coverage: {
    type: Number,
    default: 0
  }
})

const open = ref(false)


const dictionaryStore = useDictionaryStore()

const computedPercent = computed(() => {
  const percent = props.coverage * 100
  return Math.round(percent)
})

const computedColorClasses = computed(() => {
  if(computedPercent.value <= 50) {
    return 'bg-red-600'
  }
  if(computedPercent.value > 50) {
    return 'bg-orange-500'
  }
  return 'bg-green-500'
})

const additionalList = computed(() => {
  return props.additionalSkills
    .map((el) => dictionaryStore.skillList?.find((item) => item.id === el))
})



const missedList = computed(() => {
  return props.missedSkills
    .map((el) => dictionaryStore.skillList?.find((item) => item.id === el))
})

const changeOpen = (e) => {
  open.value = e
}
</script>


<template>
  <div class="relative">
    <div
      data-popover-target="popover-description"
      :class="[computedColorClasses,'text-white inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800']"
      @mouseenter="changeOpen(true)"
      @mouseleave="changeOpen(false)"
    >
      <ChartPieIcon class="w-4 h-4 me-2" />
      {{ computedPercent }}%
    </div>
    <Transition>
      <div v-if="open" data-popover id="popover-description" role="tooltip" class="absolute bottom-11 -right-12 z-10 inline-block text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">

        <div class="p-3 space-y-2">
          <h3 class="font-semibold text-gray-900 dark:text-white">Показатель навыков </h3>
          <p v-if="missedList?.length">Отсутствуют:
            <span v-for="(item, index) in missedList" :key="item.key" class="mr-0.5">
            {{item?.name || ''}}
              <span v-if="index !== additionalList?.length + 1">·</span>
          </span>
          </p>
          <p v-if="additionalList?.length">Дополнительные:
            <span v-for="(item, index) in additionalList" :key="item.key" class="mr-0.5">
            {{item?.name || ''}}
              <span v-if="index !== additionalList?.length + 1">·</span>
          </span>
          </p>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div
              class="h-2.5 rounded-full"
              :style="`width: ${computedPercent}%`"
              :class="computedColorClasses"
            >
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>