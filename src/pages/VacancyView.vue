<template>
  <div class="min-h-full">
    <!-- Page heading -->
    <header class="bg-gray-50 py-8">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <div class="min-w-0 flex-1">
          <h1 class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {{ data?.name || 'Не указано' }}
          </h1>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{ data?.employmentType?.name || 'Не указано' }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{ data?.isRemote ? 'Удаленно' : 'Не удаленно' }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{ data?.salaryString || '-' }} {{ data?.currency?.value || '' }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <AcademicCapIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{ data?.qualification?.name || '-' }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Дата публикации: {{ data?.localPublishedDate || '-' }}
            </div>
          </div>
        </div>
        <div class="mt-5 flex xl:ml-4 xl:mt-0">
          <span class="hidden sm:block">
            <RouterLink
              :to="`/vacancies/edit/${data?.id}`"
              type="button"
              class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <PencilIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Редактировать
            </RouterLink>
          </span>

          <span v-if="data?.habrUrl" class="cursor-pointer ml-3 hidden sm:block">
            <a
              type="button"
              class="pointer inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              :href="data?.habrUrl"
              target="_blank"
              rel="external"
            >
              <LinkIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Хабр
            </a>
          </span>
          <span v-if="data?.hhUrl" class="cursor-pointer ml-3 hidden sm:block">
            <a type="button"
               class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
               :href="data?.hhUrl"
               target="_blank"
               rel="external"
            >
              <LinkIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              HH
            </a>
          </span>

          <Listbox
            as="div"
            v-model="selected"
            class="sm:ml-3"
            :model-value="selected"
            @update:model-value="changeVacancyStatus"
          >
            <ListboxLabel class="sr-only">Change published status</ListboxLabel>
            <div class="relative">
              <div class="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                <div class="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                  <div
                    class="inline-flex items-center gap-x-1.5 rounded-l-md bg-purple-500 px-3 py-2 text-white shadow-sm">
                    <CheckIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    <p class="text-sm font-semibold">{{ selected?.name }}</p>
                  </div>
                  <ListboxButton
                    class="inline-flex items-center rounded-l-none rounded-r-md bg-purple-500 p-2 hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50">
                    <span class="sr-only">Change published status</span>
                    <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                  </ListboxButton>
                </div>
              </div>

              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                          leave-to-class="opacity-0">
                <ListboxOptions
                  class="absolute left-0 z-10 -mr-1 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                  <ListboxOption
                    as="template"
                    v-for="option in publishingOptions"
                    :key="option.name"
                    :value="option"
                    v-slot="{ active, selected }"
                    :disabled="option?.disabled"
                  >
                    <li
                      :class="[active ? 'bg-purple-500 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm']">
                      <div class="flex flex-col">
                        <div class="flex justify-between">
                          <p :class="selected ? 'font-semibold' : 'font-normal'">{{ option.name }}</p>
                          <span v-if="selected" :class="active ? 'text-white' : 'text-purple-500'">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>
                        <p :class="[active ? 'text-purple-200' : 'text-gray-500', 'mt-2']">{{ option.description }}</p>
                      </div>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>

          <!-- Dropdown -->
          <Menu as="div" class="relative ml-3 sm:hidden">
            <MenuButton
              class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </header>

    <main class="pb-16 pt-8">
      <div class="mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0">
          <h2 class="text-lg font-medium text-gray-900">Отклики</h2>
          <!-- Tabs -->
          <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select id="tabs" name="tabs"
                    class="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500">
              <option v-for="tab in dictionaryStore.replyStatusList" :key="tab.key" :selected="tab.current">{{ tab.value
                }}
              </option>
            </select>
          </div>
          <div class="sm:block">
            <div class="border-b border-gray-200">
              <swiper-container
                :slides-per-view="5"
              >
                <swiper-slide
                  v-for="tab in dictionaryStore.replyStatusList"
                  :key="tab.key"
                >
                  <nav class="-mb-px mt-2 flex justify-center space-x-8 w-20 cursor-pointer" aria-label="Tabs">
                    <div
                      :class="[tab.key === currentTab  ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700', 'whitespace-nowrap px-1 py-4 text-sm font-medium']"
                      @click="onTabClick(tab)"
                    >
                      {{ tab.value }}
                      <span v-if="tab.count"
                            :class="[tab.key === currentTab ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'ml-2 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block']">{{ tab.count
                        }}
                      </span>
                    </div>
                  </nav>
                </swiper-slide>

              </swiper-container>


            </div>
          </div>
        </div>

        <!-- Stacked list -->
        <ul role="list" class="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
          <li v-for="reply in replies" :key="reply.id">
            <ReplyListItem
              :id="reply.id"
              :imageUrl="reply.applicantAvatar"
              :name="reply.applicantFullname"
              :email="reply.applicantEmail"
              :status="reply.status"
              :appliedDatetime="reply.updatedAt"
            />
          </li>
        </ul>

        <!-- Pagination -->
        <Pagination />
      </div>
    </main>
    <LoadingIndicator :visible="vacancyStore.isLoading" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon
} from '@heroicons/vue/20/solid'
import ReplyListItem from '@/shared/ReplyListItem.vue'
import Pagination from '@/shared/Pagination.vue'
import { useRoute, useRouter } from 'vue-router'
import { useVacancyStore } from '@/app/store/modules/vacancy.js'
import { useReplyStore } from '@/app/store/modules/reply.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { register } from 'swiper/element/bundle'

register()
const route = useRoute()

const router = useRouter()

const vacancyStore = useVacancyStore()

const replyStore = useReplyStore()

const dictionaryStore = useDictionaryStore()

const publishingOptions = computed(() => {
    if (data.value?.publishedAt) {
      return [
        {
          name: 'Опубликована',
          description: 'This job posting can be viewed by anyone who has the link.',
          isPublish: true,
          disabled: true,
        },
        {
          name: 'Не опубликована',
          description: 'This job posting will no longer be publicly accessible.',
          isPublish: false,
          disabled: false,
        },
      ]
    } else {
      return [
        {
          name: 'Опубликована',
          description: 'This job posting can be viewed by anyone who has the link.',
          isPublish: true,
          disabled: false,
        },
        {
          name: 'Не опубликована',
          description: 'This job posting will no longer be publicly accessible.',
          isPublish: false,
          disabled: true,
        },
      ]
    }
  }
)

const data = ref(null)
const replies = ref(null)
const selected = ref()

const currentTab = computed(() => {
  return route.query?.tab
})

const onTabClick = (tab) => {
  router.push({ query: { tab: tab.key } })
}

const changeVacancyStatus = (value) => {
  console.log('value', value)
  if (!data.value?.id) {
    console.error('Vacancy id is not define')
    return
  }
  if (!value?.isPublish) {
    vacancyStore.unpublishVacancy(data.value?.id)
      .then((res) => {
        data.value = res
        if (res?.publishedAt) {
          selected.value = publishingOptions.value[0]
        } else {
          selected.value = publishingOptions.value[1]
        }
      })
  } else {
    vacancyStore.publishVacancy(data.value?.id)
      .then((res) => {
        data.value = res
        if (res?.publishedAt) {
          selected.value = publishingOptions.value[0]
        } else {
          selected.value = publishingOptions.value[1]
        }
      })
  }
}

onMounted(() => {
  //TODO: Исправить на первую доступную вкладку из запроса
  if (!currentTab.value) {
    router.push({ query: { tab: 'NEW' } })

  }
  const id = route.params?.id
  if (!id) {
    throw Error('Id is not define')
  }
  vacancyStore.getVacancy(id)
    .then((res) => {
      data.value = res
      if (res?.publishedAt) {
        selected.value = publishingOptions.value[0]
      } else {
        selected.value = publishingOptions.value[1]
      }
      replyStore.fillReplyList()
        .then((res) => {
          replies.value = res
        })
    })
})


</script>
