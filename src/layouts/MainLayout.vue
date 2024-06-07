<template>
  <div class="bg-gray-100 min-h-[100vh]">
    <header class="inset-x-0 bg-white z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex items-center justify-between w-full lg:justify-start">
          <div class="flex relative">
            <span class="absolute left-6 -top-4 font-bold">Admin</span>
            <router-link to="/" class="-mx-1.5 -mt-2 p-1.5">
              <img class="h-8 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
            </router-link>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden ml-12 lg:flex lg:gap-x-8">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                         class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-800 transform"
                         :class="$route.path === item.href && 'text-gray-800'"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <router-link to="profile" class="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </router-link>
        </div>
      </nav>
      <!--mobile-->
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <div class="flex relative">
              <span class="absolute left-6 -top-4 font-bold">Admin</span>
              <router-link to="/" class="-mx-1.5 -mt-2 p-1.5 relative">
                <img class="h-8 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
              </router-link>
            </div>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <router-link to="profile" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Профиль
                </router-link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Вакансии', href: '/vacancy' },
  { name: 'Новости', href: '/news' },
]

const mobileMenuOpen = ref(false)
</script>
