<script setup>

import VacancyForm from '@/widgets/VacancyForm.vue'
import BaseBreadcrumbs from '@/shared/BaseBreadcrumbs.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbs = computed(() => {
  const id = route?.params?.id
  const name = route?.params?.operation === 'edit' ? 'Редактирование вакансии' : "Создание вакансии"
  return [
    { name: 'Список вакансий', href: '/vacancies', current: false },
    { name: 'К вакансии', href: `/vacancies/view/${id}`, current: false },
    { name: `${name}`, disabled: true}
  ]
})

</script>

<template>
  <BaseBreadcrumbs
    :pages="breadcrumbs"
  />
  <VacancyForm />
</template>

<style scoped>

</style>