<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Вакансии
      </h1>
      <RouterLink to='/vacancies/create'>
        <button type="button"
                class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
          Новая вакансия
        </button>
      </RouterLink>
    </div>
    <div class="flex flex-col lg:flex-row w-full gap-6 justify-between">
      <div class="mt-8 pointer-events-auto w-full rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <ArrowDownOnSquareIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">Автозаполнение вакансий</p>
              <p class="mt-1 text-sm text-gray-500">
                У вас уже есть вакансии? Загрузите их, чтобы форма заполнилась автоматически
              </p>
            </div>
            <div class="ml-3 mt-auto mb-auto flex flex-shrink-0">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Импорт
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-40 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/79/HeadHunter_logo.png"
                            alt="hh-icon"
                            class="mr-3 h-5 w-5"
                          />
                          HeadHunter
                        </a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img
                            src="https://amonitoring.ru/upload/iblock/57f/57f6eb229b4c06aa42ab2e8b2a279d7a.svg"
                            alt="habr-icon"
                            class="mr-3 h-5 w-5"
                          />
                          Хабр
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:mt-8 pointer-events-auto w-full rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <ArchiveBoxArrowDownIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">Импортировать шаблон</p>
              <p class="mt-1 text-sm text-gray-500">Используйте множество готовых и специально созданных шаблонов</p>
            </div>
            <div class="ml-4 mt-auto mb-auto flex flex-shrink-0">
              <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Выбрать шаблон
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="vacancies?.length" class="mt-6 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Название
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Зарплата</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Тип занятости</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Квалификация</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Дата</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                class="cursor-pointer"
                v-for="(item, index) in vacancies"
                :key="index"
                @click="onRowClick(item.id)"
              >
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item?.salaryFrom }} -
                  {{ item?.salaryTo }} {{ item?.currency?.value || '' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item?.employmentType?.name || '-' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item?.qualification?.name || '-' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getLocalDate(item?.publishedAt) }}</td>
                <td id="buttons"
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div class="flex">
                    <RouterLink
                      class="text-indigo-600 hover:text-indigo-900"
                      :to="`vacancies/view/${item.id}`"
                      id="view"
                      @click.stop
                    >
                      <EyeIcon
                        id="view"
                        class="ml-2 w-5 cursor-pointer text-gray-600"
                      />
                      <span class="sr-only">, {{ item.name }}</span>
                    </RouterLink>
                    <RouterLink
                      class="text-indigo-600 hover:text-indigo-900"
                      :to="`vacancies/edit/${item.id}`"
                      id="edit"
                      @click.stop
                    >
                      <PencilIcon
                        id="edit"
                        class="ml-2 w-5 cursor-pointer text-gray-600"
                      />
                      <span class="sr-only">, {{ item.name }}</span>
                    </RouterLink>
                    <TrashIcon
                      class="ml-2 w-5 cursor-pointer text-gray-600"
                      @click.stop="onRemove(item.id)"
                      id="remove"
                    />
                  </div>

                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <EmptyState
      class="mt-16"
      v-else
      title="Вакансии не найдены"
      description="Для добавления вакансии, нажите кнопку 'Новая вакансия'"
    />
    <ConfirmModal
      :visible="isConfirmModal"
      @close="closeModal"
      confirm-text="Вы уверены, что хотите удалить вакансию?"
      @onConfirm="confirmAction"
      cancel-btn-text="Отмена"
      confirmBtnText="Удалить"
      title="Удаление вакансии"
    />
    <LoadingIndicator :visible="vacancyStore.isLoading" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useVacancyStore } from '@/app/store/modules/vacancy.js'
import { TrashIcon, PencilIcon, EyeIcon, ChevronDownIcon,} from '@heroicons/vue/20/solid'
import { ArrowDownOnSquareIcon, ArchiveBoxArrowDownIcon } from '@heroicons/vue/24/outline'
import ConfirmModal from '@/shared/ConfirmModal.vue'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import EmptyState from '@/shared/EmptyState.vue'
import { getLocalDate } from '../shared/utils/getLocalDate.js'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const vacancies = ref(false)
const isConfirmModal = ref(false)
const removedId = ref(null)

//* store
const vacancyStore = useVacancyStore()

const router = useRouter()

const onRemove = (id) => {
  isConfirmModal.value = true
  removedId.value = id
}

const onRowClick = (id) => {
  if(!id) {
    console.error('Id is not define')
    return
  }
  router.push(`/vacancies/view/${id}`)
}

const closeModal = () => {
  isConfirmModal.value = false
}

const confirmAction = () => {
  if (removedId.value) {
    isLoading.value = true
    vacancyStore.deleteVacancy(removedId.value)
      .then(() => {
        fillVacancies()
        isConfirmModal.value = false
      })
  } else {
    console.error('Id is not define')
  }

}

const fillVacancies = async () => {
  isLoading.value = true
  await vacancyStore.fillVacancyList().then((res) => {
    vacancies.value = res
  })
    .finally(() => isLoading.value = false)
}

onMounted(() => {
  fillVacancies()
})
</script>
