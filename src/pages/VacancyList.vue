<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Вакансии
      </h1>
      <button type="button" class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
        Новая вакансия
      </button>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Название</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Зарплата</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Тип занятости</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Квалификация</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Навыки</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Дата</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(item, index) in vacancyList" :key="index">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.title }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.email }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.role }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.role }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.role }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                  >Edit<span class="sr-only">, {{ item.name }}</span></a
                  >
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import {useVacancyStore} from "@/app/store/modules/vacancy.js";

const isLoading = ref(false)

//* store
const vacancyStore = useVacancyStore()

const vacancyList = [
  { name: 'Front-end Developer', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]


onMounted(async () => {
  isLoading.value = true
  // await vacancyStore.fillVacancyList().then((res) => {
  //   console.log('fillVacancyList', res)
  // })
  isLoading.value = false
})
</script>
