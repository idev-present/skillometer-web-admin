<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        База резюме
      </h1>

    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Имя</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Специализация</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Квалификация</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Зарплата</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Опыт</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Возраст</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                class="cursor-pointer"
                v-for="(item, index) in applicants"
                :key="index"
                @click="onRowClick(item.id)"
              >
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.title }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item?.division?.name || '-' }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.qualification?.name || '-' }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{item?.salaryString || "-"}}{{item?.currency?.value || ''}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item?.experience || '-' }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item?.age || '-'}}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div class="flex">
                    <RouterLink
                      class="text-indigo-600 hover:text-indigo-900"
                      :to="`applicants/view/${item.id}`"
                    >
                      <EyeIcon
                        class="ml-2 w-5 cursor-pointer text-gray-600"
                      />
                      <span class="sr-only">, {{ item.name }}</span>
                    </RouterLink>
                  </div>

                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ConfirmModal
      :visible="isConfirmModal"
      @close="closeModal"
      confirm-text="Вы уверены, что хотите удалить вакансию?"
      @onConfirm="confirmAction"
      cancel-btn-text="Отмена"
      confirmBtnText="Удалить"
      title="Удаление вакансии"
    />
    <LoadingIndicator :visible="applicantStore.isLoading"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { EyeIcon } from "@heroicons/vue/20/solid";
import ConfirmModal from '@/shared/ConfirmModal.vue'
import { useApplicantStore } from '@/app/store/modules/applicant.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const applicants = ref(false)
const isConfirmModal = ref(false)
const router = useRouter()

//* store
const applicantStore = useApplicantStore()


const fillApplicants = async () => {
  isLoading.value = true
  await applicantStore.fillApplicantList().then((res) => {
    applicants.value = res
  })
    .finally(() => isLoading.value = false)
}

const onRowClick = (id) => {
  if(!id) {
    console.error('Id is not define')
    return
  }
  router.push(`/applicants/view/${id}`)
}

onMounted(async () => {
  await fillApplicants()
})
</script>
