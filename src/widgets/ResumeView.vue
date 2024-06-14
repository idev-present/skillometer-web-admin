<template>
  <div class="">
    <div class="bg-white shadow-sm ring-1 lg:mb-5 ring-gray-900/5 rounded-xl">
      <main class="relative mt-2">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">

            <div v-if="!isLoading" class="divide-y divide-gray-200 lg:col-span-12">
              <div class="flex justify-between px-4 py-4 sm:p-4 pb-3">
                <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Резюме
                </h1>
                <div
                  class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <button type="button"
                          class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Disqualify
                  </button>
                  <button type="button"
                          class="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Advance to offer
                  </button>
                </div>
              </div>
              <!-- Личная информация -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                    Личная информация
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-12">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Имя Фамилия</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      ХЗ
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Пол</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      ХЗ
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Возраст</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      ХЗ - не правильно
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Город</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      ХЗ - не правильно
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-12">
                    <div class="text-sm font-medium leading-6 text-gray-900">Описание</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.bio || '-'}}
                    </div>
                  </div>
                </div>
              </div>
              <!-- Специализация -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                    Специализация
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Готовность к работе</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.selectedSearchStatus?.name || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Квалификация</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.selectedQualification?.name || '-'}}
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Специализация</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.selectedDivision?.name || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Зарплата</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      от {{resume?.salary_from || '-'}}
                      <div class="ml-1" v-if="resume?.selectedCurrency?.value">
                        {{resume.selectedCurrency.value}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-12">
                    <div class="text-sm font-medium leading-6 text-gray-900">Профессиональные навыки</div>
                    <div v-if="resume?.skills?.length" class="flex items-center">
                      <div v-for="(skill, index) in resume.skills"
                           :key="index"
                           class="mt-0.5 flex items-center text-sm leading-6 text-gray-700"
                      >
                        <svg
                          v-if="index"
                          viewBox="0 0 2 2"
                          class="hidden sm:flex h-0.5 w-0.5 mx-2 fill-current"
                        >
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                        {{ skill }}
                      </div>
                    </div>
                    <div v-else class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      -
                    </div>
                  </div>
                </div>
                <div v-if="resume?.is_relocation || resume?.is_remote"
                     class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6"
                >
                  <div
                    v-if="resume?.is_relocation"
                    class="col-span-6"
                  >
                    <div class="mt-0.5 flex items-center font-medium text-sm leading-6 text-gray-900">
                      Готов к переезду
                    </div>
                  </div>
                  <div v-if="resume?.is_remote" class="col-span-6">
                    <div class="mt-0.5 flex items-center font-medium text-sm leading-6 text-gray-900">
                      Готов к удаленной работе
                    </div>
                  </div>
                </div>
              </div>
              <!-- Опыт работы -->
              <div v-if="resume?.xp?.length" class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                    Опыт работы
                </div>
                <div class="divide-y divide-gray-300 lg:col-span-9">
                  <div
                    v-for="(item, index) in resume?.xp"
                    :key="index"
                  >
                    <div class="py-4" :class="(index + 1 === resume?.xp?.length) && 'pb-0'">
                      <div class="grid grid-cols-12">
                        <div class="col-span-12 text-lg font-bold leading-6 text-gray-900">
                          {{item?.company_name || '-'}}
                        </div>
                        <div class="col-span-12 mt-0.5 text-sm leading-6 text-gray-700">{{item?.position || '-'}}</div>
                      </div>
                      <div class="pt-4 grid grid-cols-12 gap-6">
                        <div class="col-span-12">
                          <div class="text-sm font-medium leading-6 text-gray-900">Ваши обязанности и достижения</div>
                          <div class="mt-0.5 text-sm leading-6 text-gray-700">{{item?.description || '-'}}</div>
                        </div>
                      </div>
                      <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Начало работы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                              aria-hidden="true"
                            />
                            {{item?.start_date ? formatDate(item.start_date) : '-'}}
                          </div>
                        </div>
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Окончание работы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                              aria-hidden="true"
                            />
                            {{item?.end_date ? formatDate(item?.end_date) : 'По настоящее время'}}
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 grid grid-cols-12 gap-6">
                        <div class="col-span-12">
                          <div class="text-sm font-medium leading-6 text-gray-900">Применяемые вами навыки</div>
                          <div class="mt-0.5 text-sm leading-6 text-gray-700 flex items-center">
                            <div
                              v-for="(skill, indexSkills) in item?.skills"
                              :key="indexSkills"
                              class="flex items-center"
                            >
                              <svg
                                v-if="indexSkills"
                                viewBox="0 0 2 2"
                                class="hidden sm:flex h-0.5 w-0.5 mx-2 fill-current"
                              >
                                <circle cx="1" cy="1" r="1" />
                              </svg>
                              {{skill}}
                            </div>
                            <div v-if="!item?.skills?.length">
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Образование -->
              <div v-if="resume?.education?.length" class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                    Образование
                </div>
                <div class="divide-y divide-gray-300 lg:col-span-9">
                  <div
                    v-for="(item, index) in resume?.education"
                    :key="index"
                  >
                    <div class="py-4" :class="(index + 1 === resume?.education?.length) && 'pb-0'">
                      <div class="grid grid-cols-12">
                        <div class="col-span-12 text-lg font-bold leading-6 text-gray-900">
                          {{item?.university_name || '-'}}
                        </div>
                        <div class="col-span-12 mt-0.5 text-sm leading-6 text-gray-700">{{item?.faculty_name || '-'}}</div>
                      </div>
                      <div class="pt-4 grid grid-cols-12 gap-4 sm:gap-6">
                        <div class="col-span-12 sm:col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Местоположение учебного заведения</div>
                          <div class="mt-0.5 text-sm leading-6 text-gray-700">{{item?.city?.name || '-'}}</div>
                        </div>
                        <div class="col-span-12 sm:col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Специализация</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            {{item?.specialization || ''}}
                          </div>
                        </div>
                      </div>
                      <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Начало учебы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                              aria-hidden="true"
                            />
                            {{item?.start_date ? formatDate(item.start_date) : '-'}}
                          </div>
                        </div>
                        <div class="col-span-6">
                          <div class="text-sm font-medium leading-6 text-gray-900">Завершение учебы</div>
                          <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                            <CalendarIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                              aria-hidden="true"
                            />
                            {{item?.end_date ? formatDate(item?.end_date) : 'По настоящее время'}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Контакты -->
              <div class="px-4 py-6 sm:p-6 lg:pb-8">
                <div class="col-span-12 mb-2 flex flex-col sm:flex-row justify-between text-xl font-medium leading-6 text-gray-900">
                    Контакты
                </div>
                <div class="pt-4 grid grid-cols-6 gap-4 sm:grid-cols-12 sm:gap-6">
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Электронная почта</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.email || '-'}}
                    </div>
                  </div>
                  <div class="col-span-6">
                    <div class="text-sm font-medium leading-6 text-gray-900">Телефон</div>
                    <div class="mt-0.5 flex items-center text-sm leading-6 text-gray-700">
                      {{resume?.phone ? maskPhone(resume.phone) : '-'}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <LoadingIndicator class="py-40 divide-y divide-gray-200 lg:col-span-9" v-else />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import { CalendarIcon} from "@heroicons/vue/20/solid/index.js";
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { useApplicantStore } from '@/app/store/modules/applicant.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'

const isLoading = ref(false)

//* store
const applicantStore = useApplicantStore()
const dictionaryStore = useDictionaryStore()


const searchStatusList = computed(() => {
  return dictionaryStore?.searchStatusList || []
})
const qualificationList = computed(() => {
  return dictionaryStore?.qualificationList || []
})
const divisionList = computed(() => {
  return dictionaryStore?.divisionList || []
})
const currencyList = computed(() => {
  return dictionaryStore?.currencyList || []
})
const cityList = computed(() => {
  return dictionaryStore?.cityList || []
})

const resume = computed(() => {
  return {
    ...applicantStore.resume,
    selectedSearchStatus: searchStatusList?.value?.find((e) => e.id === applicantStore?.resume?.search_status_id) || null,
    selectedQualification: qualificationList?.value?.find((e) => e.id === applicantStore?.resume?.qualification_id) || null,
    selectedDivision: divisionList?.value?.find((e) => e.id === applicantStore?.resume?.division_id) || null,
    selectedCurrency: currencyList?.value?.find((e) => e.key === applicantStore?.resume?.currency) || null,
    skills: applicantStore?.resume?.skill_set?.split(',') || [],
    xp: applicantStore?.resume?.xp?.map((item) => ({
      ...item,
      skills: item?.skill_set?.split(',') || [],
    })) || [],
    education: applicantStore?.resume?.education?.map((item) => ({
      ...item,
      city: cityList?.value?.find((e) => e.id === (item?.city_id || '')) || null,
    })) || [],
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const maskPhone = (phone) => {
  if (phone.length !== 10) {
    return ''
  }
  const areaCode = phone.slice(0, 3);
  const centralOfficeCode = phone.slice(3, 6);
  const lineNumberPart1 = phone.slice(6, 8);
  const lineNumberPart2 = phone.slice(8);
  return `+7 (${areaCode}) ${centralOfficeCode}-${lineNumberPart1}-${lineNumberPart2}`
}

onMounted(async () => {
  await applicantStore.fillResume()
})
</script>
