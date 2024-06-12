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
    <div v-if="vacancies?.length" class="mt-8 flow-root">
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
import { useVacancyStore } from '@/app/store/modules/vacancy.js'
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/vue/20/solid'
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
  console.log('id', id)
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
    console.log('fillVacancyList', res)
    vacancies.value = res
  })
    .finally(() => isLoading.value = false)
}

onMounted(() => {
  fillVacancies()
})
</script>
