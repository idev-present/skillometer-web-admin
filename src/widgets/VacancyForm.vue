<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ title }}</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what
          you share.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-4">
            <BaseInput
              v-model="name"
              label="Название вакансии"
            />
          </div>
          <div class="col-span-4">
            <BaseTextarea
              v-model="description"
              label="Описание вакансии"
            />
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-2 sm:col-span-1">
            <BaseInput
              label="Зарплата от"
              :mask-options="{
                  mask: '##########',
            }"
              v-model="salaryFrom"
            />
          </div>
          <div class="col-span-2 sm:col-span-1">
            <BaseInput
              label="Зарплата до"
              :mask-options="{
                   mask: '##########',
            }"
              v-model="salaryTo"
            />
          </div>
          <div class="col-span-2 sm:col-span-1">
            <BaseSelect
              label="Валюта"
              :items="currencyList"
              v-model="currency"
            />
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-4">
            <div class="col-span-4">
              <BaseContentEditor
                label="Требования к кандидату"
                v-model="todo"
              />
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-4">
            <BaseContentEditor
              label="О компании"
              v-model="team"
            />
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-4">
            <BaseCombobox
              label="Город"
              :items="cityList"
              v-model="city"
            />
          </div>

        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-1 sm:col-start-1">
            <BaseSelect
              label="Тип занятности"
              :items="employmentTypeList"
              v-model="employmentType"
            />
          </div>

          <div class="sm:col-span-2">
            <BaseSelect
              label="Специализация"
              :items="divisionList"
              v-model="division"
            />
          </div>

          <div class="sm:col-span-2 mt-8">
            <BaseCheckbox
              label="Удаленно"
              v-model="isRemote"
            />
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-2 sm:col-start-1">
            <BaseCombobox
              label="Квалификация"
              :items="qualificationList"
              v-model="qualification"
            />
          </div>

          <div class="sm:col-span-2">
            <div class="col-span-4">
              <BaseCombobox
                multiple
                label="Скилл"
                :items="skillList"
                v-model="skill"
              />
              <span class="text-sm text-gray-500">Выбрано: {{skill.length}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click.prevent="createVacancy"
      >
        Создать
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseInput from '@/shared/BaseInput.vue'
import BaseTextarea from '@/shared/BaseTextarea.vue'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import BaseSelect from '@/shared/BaseSelect.vue'
import BaseCheckbox from '@/shared/BaseCheckbox.vue'
import BaseCombobox from '@/shared/BaseCombobox.vue'
import BaseContentEditor from '@/shared/BaseContentEditor.vue'
import { useVacancyStore } from '@/app/store/modules/vacancy.js'
import { decamelize } from '@/shared/utils/keyConverter.js'

const vacancyStore = useVacancyStore()

const route = useRoute()
const {
  currencyList,
  cityList,
  employmentTypeList,
  divisionList,
  qualificationList,
  skillList
} = useDictionaryStore()
const name = ref('')
const description = ref('')
const salaryFrom = ref('')
const salaryTo = ref('')
const currency = ref(null)
const isRemote = ref(false)
const todo = ref("")
const city = ref(null)
const team = ref("")
const employmentType = ref(null)
const division = ref(null)
const skill = ref([])
const qualification = ref(null)
const loading = ref(false)

const title = computed(() => {
  if (route.params?.operation === 'edit') {
    return 'Редактирование вакансии'
  }
  if (route.params?.operation === 'create') {
    return 'Создание вакансии'
  }
  return ''
})

const createVacancy = () => {
  const skillSet = skill?.value || []
  const data = {
    name: name.value,
    salaryFrom: salaryFrom.value,
    salaryTo: salaryTo.value,
    currency: currency.value?.key,
    isRemote: isRemote.value,
    description: description.value,
    team: team.value,
    todo: todo.value,
    cityId: city.value?.value,
    employmentTypeId: employmentType.value?.id,
    divisionId: division.value?.id,
    qualificationId: qualification.value?.id,
    skillSet: skillSet.map((el) => el?.id).join(',')
  }
  const preparedData = decamelize(data)
  console.log(data)
  loading.value = true
  vacancyStore.createVacancy(preparedData)
    .then((res) => {
      console.log(res)
  })
    .finally(() => loading.value = false)

}

</script>
