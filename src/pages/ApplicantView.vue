<script setup>

import { PaperClipIcon } from '@heroicons/vue/20/solid/index.js'
import { ref } from 'vue'

const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' }
]

const isFull = ref(false)

const changeViewMode = () => {
  isFull.value = !isFull.value
}

const props = defineProps({
  applicant: {
    type: Object,
    default: () => ({}),
  },

})

</script>

<template>
  <section aria-labelledby="applicant-information-title">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <div class="flex justify-between">
          <h2 id="applicant-information-title" class="text-lg font-medium leading-6 text-gray-900">Информация о
            кандидате</h2>
          <span v-if="applicant?.lastVisited" class="mt-1 max-w-2xl text-xs text-gray-500">Последний визит {{applicant?.lastVisited}}</span>
        </div>
        <span class="mt-1 max-w-2xl text-sm text-gray-500">Личные данные</span>



      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div v-if="applicant?.age" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Возраст</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ applicant?.age || 'Не указана' }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Специализация</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ applicant?.division?.name || 'Не указана' }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Квалификация</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ applicant?.qualification?.name || 'Не указана' }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Ожидание заработной платы</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ applicant?.salaryString || 'Не указано'
              }}{{ applicant?.currency?.value || '' }}
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Готовность к переезду</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ applicant?.isRelocation ? 'Да' : 'Нет' }}</dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Навыки</dt>
            <div class="flex mt-1 text-sm text-gray-900">
                      <span
                        v-for="item in applicant?.skillSet"
                        :key="item.id"
                        class="mr-2 inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                          <svg class="h-1.5 w-1.5 fill-blue-500" viewBox="0 0 6 6" aria-hidden="true">
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                          {{item?.name || ''}}
                      </span>
            </div>
          </div>

<!--          <div class="sm:col-span-2">-->
<!--            <dt class="text-sm font-medium text-gray-500">Attachments</dt>-->
<!--            <dd class="mt-1 text-sm text-gray-900">-->
<!--              <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">-->
<!--                <li v-for="attachment in attachments" :key="attachment.name"-->
<!--                    class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">-->
<!--                  <div class="flex w-0 flex-1 items-center">-->
<!--                    <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />-->
<!--                    <span class="ml-2 w-0 flex-1 truncate">{{ attachment.name }}</span>-->
<!--                  </div>-->
<!--                  <div class="ml-4 flex-shrink-0">-->
<!--                    <a :href="attachment.href"-->
<!--                       class="font-medium text-blue-600 hover:text-blue-500">Download</a>-->
<!--                  </div>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </dd>-->
<!--          </div>-->
        </dl>
      </div>
      <div>
        <a
           class="w-full justify-center flex bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
           :href="`/applicants/view/${applicant?.id}`"
           target="_blank"
        >
          Перейти к полному резюме
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>