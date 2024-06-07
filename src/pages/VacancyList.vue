<template>
  <div class="mx-auto w-full max-w-7xl px-4 py-8 md:py-16 sm:px-6 lg:px-8">
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
      Вакансии
    </h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import {useVacancyStore} from "@/app/store/modules/vacancy.js";

const isLoading = ref(false)

//* store
const vacancyStore = useVacancyStore()


onMounted(async () => {
  isLoading.value = true
  // await vacancyStore.fillVacancyList().then((res) => {
  //   console.log('fillVacancyList', res)
  // })
  isLoading.value = false
})
</script>
