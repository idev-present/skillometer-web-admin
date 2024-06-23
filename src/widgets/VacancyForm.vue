<template>
  <form v-if="!vacancyStore.isLoading">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ title }}</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Эта информация будет отображаться публично, поэтому будьте осторожны с тем, чем делитесь.</p>

        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="col-span-4 rounded-md bg-blue-50 p-2">
            <div class="flex">
              <div class="flex-shrink-0">
                <InformationCircleIcon class="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <div class="ml-2 flex-1 md:flex md:justify-between">
                <p class="text-sm text-blue-700">
                  Описания вакансий объемом более 500 слов с подробными задачами, обязанностями и требованиями к кандидатам привлекают больше заявок
                </p>
              </div>
            </div>
          </div>

          <div class="col-span-4">
            <BaseInput
              :message="errors?.name"
              v-model="name"
              label="Название вакансии"
              @on-focus="clearError('name')"
            />
          </div>
          <div class="col-span-4">
            <div class="w-full relative">
              <div class="flex justify-between">
                <label
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Описание вакансии
                </label>
                <div
                  @click="generateDescription"
                  class="flex mb-1 px-2 py-1 cursor-pointer text-sm rounded border border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
                >
                  <SparklesIcon class="h-5 w-5 text-blue-600 hover-group:border-blue-900 mr-1" />
                  {{isLoadingGenerateDescription ? 'Генерируем...' : 'Сгенерировать через ИИ'}}
                </div>
              </div>
              <textarea
                v-model="description"
                class="h-20 shadow-sm block w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <p v-if="errors?.description" class="mt-2 text-sm text-red-600">
              {{ errors?.description }}
            </p>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
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
              :message="errors?.currency"
              @on-focus="clearError('currency')"
            />
          </div>
        </div>
        <div class="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="col-span-4">
            <div class="col-span-4 relative">
              <div
                @click="generateTodo"
                class="absolute right-0 -top-1.5 flex mb-1 px-2 py-1 cursor-pointer text-sm rounded border border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
              >
                <SparklesIcon class="h-5 w-5 text-blue-600 hover-group:border-blue-900 mr-1" />
                {{isLoadingGenerateTodo ? 'Генерируем...' : 'Сгенерировать через ИИ'}}
              </div>
              <BaseContentEditor
                label="Требования к кандидату"
                v-model="todo"
                :message="errors?.todo"
                @on-focus="clearError('todo')"
              />
            </div>
          </div>
        </div>
        <div class="mt-9 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="col-span-4 relative">
            <div
              @click="generateTeam"
              class="absolute right-0 -top-1.5 flex mb-1 px-2 py-1 cursor-pointer text-sm rounded border border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
            >
              <SparklesIcon class="h-5 w-5 text-blue-600 hover-group:border-blue-900 mr-1" />
              {{isLoadingGenerateTeam ? 'Генерируем...' : 'Сгенерировать через ИИ'}}
            </div>
            <BaseContentEditor
              label="О компании"
              v-model="team"
              :message="errors?.team"
              @on-focus="clearError('team')"
            />
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="col-span-4">
            <BaseCombobox
              label="Город"
              :items="cityList"
              v-model="city"
              :message="errors?.cityId"
              @on-focus="clearError('cityId')"
            />
          </div>

        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="sm:col-span-2 sm:col-start-1">
            <BaseSelect
              label="Тип занятности"
              :items="employmentTypeList"
              v-model="employmentType"
              :message="errors?.employmentTypeId"
              @on-focus="clearError('employmentTypeId')"
            />
          </div>
          <div class="sm:col-span-2 sm:mt-7">
            <BaseCheckbox
              label="Удаленная работа"
              v-model="isRemote"
            />
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="sm:col-span-2 sm:col-start-1">
            <BaseCombobox
              label="Квалификация"
              :items="qualificationList"
              v-model="qualification"
              :message="errors?.qualificationId"
              @on-focus="clearError('qualificationId')"
            />
          </div>
          <div class="sm:col-span-2">
            <BaseCombobox
              label="Специализация"
              :items="divisionList"
              v-model="division"
              :message="errors?.divisionId"
              @on-focus="clearError('divisionId')"
            />
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <div class="col-span-4">
              <label class="block text-sm font-medium leading-6 text-gray-900">
                Навыки
              </label>
              <p class="mt-0.5 text-sm text-gray-500">
                Укажите профессиональные навыки, которыми соискатель должен владеть.
              </p>
              <multiselect
                class="mt-1"
                v-model="skill"
                placeholder="Найдите или добавьте тег"
                :show-labels="false"
                label="name"
                track-by="id"
                :options="skillList"
                :multiple="true"
                :taggable="true"
                @tag="addTagSkill"
              />
              <div v-if="proposedSkill?.length" class="flex flex-col text-sm py-2">
                <label class="block text-sm leading-6 text-gray-900">
                  Рекомендуемые навыки:
                </label>
                <div class="flex mt-0.5">
                  <div v-for="(item, index) in proposedSkill"
                       :key="index"
                       class="cursor-pointer mr-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                       @click="addSkill(item)"
                  >
                    {{item.name}}
                  </div>
                </div>
              </div>
              <span v-if="errors?.skillSet" class="text-red-600 text-sm">
                {{errors.skillSet}}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">
              Соответствие навыков
            </label>
            <p class="mt-0.5 text-sm text-gray-500">
              Укажите, минимальное соответствие навыков (Если соискатель наберет меньше указанного, то ему автоматички придет отказ)
            </p>
            <div class="flex items-center relative mb-6 mt-2">
              <BaseInput
                class="w-14 mr-4"
                v-model="range"
                @input="validateRange"
              />
              <div class="flex w-full relative mb-4">
                <input id="labels-range-input" type="range" v-model="range" min="0" max="100"
                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0%</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">50%</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900"
              @click.prevent="back"
      >
        Отменить
      </button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click.prevent="actionResolver"
      >
        {{buttonName}}
      </button>
    </div>
  </form>
  <LoadingIndicator v-else/>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '@/shared/BaseInput.vue'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import BaseSelect from '@/shared/BaseSelect.vue'
import BaseCheckbox from '@/shared/BaseCheckbox.vue'
import BaseCombobox from '@/shared/BaseCombobox.vue'
import BaseContentEditor from '@/shared/BaseContentEditor.vue'
import { useVacancyStore } from '@/app/store/modules/vacancy.js'
import { decamelize } from '@/shared/utils/keyConverter.js'
import VacancyForm from '@/app/forms/VacancyForm.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css"
import { SparklesIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'


const vacancyStore = useVacancyStore()

const route = useRoute()
const router = useRouter()
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
const id = ref(null)
const loading = ref(false)
const range = ref(50)
const errors = ref({
  name: '',
  currency: '',
  description: '',
  team: '',
  todo: '',
  cityId: '',
  employmentTypeId: '',
  divisionId: '',
  qualificationId: '',
  skillSet: '',
})

const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = "";
  }
};

const proposedSkill = computed(() => {
  const recommendedSkills = [
    {
      id: 'javascript',
      'name': 'JavaScript',
      'type': 'hard',
      'qualification_id': null,
      'division_id': 'frontend_razrabotchik',
      'habr_id': 264
    },
    {
      id: "html",
      "name": "HTML",
      "type": "hard",
      "qualification_id": null,
      "division_id": "frontend_razrabotchik",
      "habr_id": 1017
    },
    {
      id: 'css',
      'name': 'CSS',
      'type': 'hard',
      'qualification_id': null,
      'division_id': 'frontend_razrabotchik',
      'habr_id': 32
    },
    {
      id: "typescript",
      "name": "TypeScript",
      "type": "hard",
      "qualification_id": null,
      "division_id": "frontend_razrabotchik",
      "habr_id": 245
    },
    {
      id: "react",
      "name": "React",
      "type": "hard",
      "qualification_id": null,
      "division_id": "frontend_razrabotchik",
      "habr_id": 1070
    }
  ]
  return recommendedSkills?.filter(recommendedSkill => {
    return !(skill?.value?.some(selectedSkill => selectedSkill?.id === recommendedSkill.id));
  }) || [];
})

const addSkill = (item) => {
  skill.value.push(item)
}

const title = computed(() => {
  if (route.params?.operation === 'edit') {
    return 'Редактирование вакансии'
  }
  if (route.params?.operation === 'create') {
    return 'Создание вакансии'
  }
  return ''
})

const buttonName = computed(() => {
  if (route.params?.operation === 'edit') {
    return 'Сохранить'
  }
  if (route.params?.operation === 'create') {
    return 'Создать'
  }
  return ''
})

const addTagSkill = (newTag) => {
  skill.value.push(newTag)
}

const back = () => {
  router.push('/vacancies')
}

const payloadBuilder = () => {
  const skillSet = skill?.value || []
  return {
    name: name.value,
    salaryFrom: salaryFrom.value,
    salaryTo: salaryTo.value,
    currency: currency.value?.key,
    isRemote: isRemote.value,
    description: description.value,
    team: team.value,
    todo: todo.value,
    cityId: city.value?.key,
    employmentTypeId: employmentType.value?.id,
    divisionId: division.value?.id,
    qualificationId: qualification.value?.id,
    skillSet: skillSet.map((el) => el?.id).join(',')
  }
}

const actionResolver = () => {
  const data = payloadBuilder()
  errors.value = VacancyForm.validate(data)
  const step = route.params?.operation
  if(!errors.value && !loading.value) {
    const preparedData = decamelize(data)
    loading.value = true
    if(step === 'create') {
      vacancyStore.createVacancy(preparedData)
        .then((res) => {
        })
        .finally(() => {
          loading.value = false
          back()
        })
    }
    if(!id.value) {
      console.error('Id is not define')
    }
    if(step === 'edit' && id?.value) {
      vacancyStore.editVacancy(id?.value, data)
        .then(() => {
          router.push('/vacancies')
        })
        .finally(() => {
          loading.value = false
          back()
        })
    }

  }
}

const fillFields = (data) => {
  id.value = data.id
  name.value = data.name
  description.value = data.description
  salaryFrom.value = data.salaryFrom
  salaryTo.value = data.salaryTo
  currency.value = data.currency
  isRemote.value = data.isRemote
  todo.value = data.todo
  city.value = data.city
  team.value = data.team
  employmentType.value = data.employmentType
  division.value = data.division
  skill.value = data.skill
  qualification.value = data.qualification
}

const validateRange = (event) => {
  let value = event.target.value;
  value = value.replace(/\D/g, '');
  if (value !== '') {
    value = Math.max(0, Math.min(100, parseInt(value)));
  }
  range.value = value;
}

const isLoadingGenerateDescription = ref(false)
const generateDescription = () => {
  if(isLoadingGenerateDescription.value) {
    return
  }
  isLoadingGenerateDescription.value = true
  setTimeout(() => {
    isLoadingGenerateDescription.value = false;
  }, 5000);
}

const isLoadingGenerateTodo = ref(false)
const generateTodo = () => {
  if(isLoadingGenerateTodo.value) {
    return
  }
  isLoadingGenerateTodo.value = true
  setTimeout(() => {
    isLoadingGenerateTodo.value = false;
  }, 5000);
}
const isLoadingGenerateTeam = ref(false)
const generateTeam = () => {
  if(isLoadingGenerateTeam.value) {
    return
  }
  isLoadingGenerateTeam.value = true
  setTimeout(() => {
    isLoadingGenerateTeam.value = false;
  }, 5000);
}

onMounted(async() => {
  if(route.params?.operation === 'edit' && route.params?.id) {
    await vacancyStore.getVacancy(route.params.id)
      .then((res) => fillFields(res))
  }
})
</script>

<style scoped>
:deep(.multiselect__input) {
  font-size: 14px;
  outline: none;
  box-shadow: none;
}
:deep(.multiselect__tags) {
  @apply block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6;
}
:deep(.multiselect__option) {
  font-size: 0.875rem;
  height: 30px;
  &:after {
    display: none;
  }
}
:deep(.multiselect__single) {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  margin-top: 0.2rem;
}
</style>
