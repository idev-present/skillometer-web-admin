<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Контакты
      </h1>
    </div>
    <div v-if="!isLoading" class="mt-8 divide-y divide-gray-200">
      <div class="lg:pb-8">
        <!--Почта/Телефон-->
        <div class="mt-4 grid grid-cols-12 gap-4 sm:gap-6">
          <div class="col-span-12 sm:col-span-6">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900">
              Электронная почта
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="user.email"
              class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <span v-if="errors?.email" class="text-red-600 text-sm">
                        {{ errors.email }}
                      </span>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label
              for="phone"
              class="block text-sm font-medium leading-6 text-gray-900">
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              v-model="user.phone"
              v-maska="'+7(###)###-##-##'"
              class="block mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <span v-if="errors?.phone" class="text-red-600 text-sm">
              {{ errors.phone }}
            </span>
          </div>
        </div>
      </div>
      <!--сохранить-->
      <div class="flex justify-end gap-x-3 px-4 py-4 sm:px-6">
        <button @click="saveForm" type="button" class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
          Сохранить
        </button>
      </div>
    </div>

    <loading class="py-40 divide-y divide-gray-200 lg:col-span-9" v-else />
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import Loading from "@/shared/Loading.vue";
import ContactsForm from "@/app/forms/ContactsForm";
import { vMaska } from 'maska/vue'
import { useUserStore } from '@/app/store/modules/user.js'

const isLoading = ref(false)

//* store
const userStore = useUserStore()

const user = ref({
  email: '',
  phone: '',
});
const errors = ref ({
  email: '',
  phone: '',
})

const saveForm = async () => {
  const cleaned = user?.value?.phone?.replace(/[^\d]/g, '') || ''
  const resPhone = cleaned.startsWith('7') ? cleaned.substring(1) : cleaned;
  const payload = {
    email: user?.value?.email || '',
    phone: resPhone || '',
  }
  errors.value = ContactsForm.validate(payload)
  if(!errors.value && !isLoading.value) {
    isLoading.value = true
    await userStore.updateContacts(payload).finally(() => {
      isLoading.value = false
    })
  }
}

onMounted(async () => {
  isLoading.value = true
  await userStore.getContacts().finally(() => {
    user.value = {
      email: userStore?.contacts?.email || '',
      phone: userStore?.contacts?.phone || '',
    }
    isLoading.value = false
  })
})
</script>
