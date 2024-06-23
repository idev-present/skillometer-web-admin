<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center relative">
                  <span class="absolute left-6 -top-0.5 font-bold">Admin</span>
                  <router-link to="/" class="-mx-1.5 -mt-2 p-1.5">
                    <img class="h-8 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
                  </router-link>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <router-link @click="sidebarOpen = false" :to="item.href" :class="[currentPage.includes(item.href) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                            <component :is="item.icon" :class="[currentPage.includes(item.href) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                            {{ item.name }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div class="text-xs font-semibold leading-6 text-gray-400">Кабинет</div>
                      <ul role="list" class="-mx-2 mt-2 space-y-1">
                        <li v-for="team in teams" :key="team.name">
                          <router-link @click="sidebarOpen = false" :to="team.href" :class="[currentPage.includes(team.href) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                            <span :class="[currentPage.includes(team.href) ? 'border-indigo-600 text-indigo-600' : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium']">{{ team.initial }}</span>
                            <span class="truncate">{{ team.name }}</span>
                          </router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center relative">
          <span class="absolute left-6 -top-0.5 font-bold">Admin</span>
          <router-link to="/" class="-mx-1.5 -mt-2 p-1.5">
            <img class="h-8 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
          </router-link>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <router-link :to="item.href" :class="[currentPage.includes(item.href) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    <component :is="item.icon" :class="[currentPage.includes(item.href) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li>
              <div class="text-xs font-semibold leading-6 text-gray-400">Кабинет</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li v-for="team in teams" :key="team.name">
                  <router-link :to="team.href" :class="[currentPage.includes(team.href) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    <span :class="[currentPage.includes(team.href) ? 'border-indigo-600 text-indigo-600' : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium']">{{ team.initial }}</span>
                    <span class="truncate">{{ team.name }}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div  class="lg:pl-72">
      <div  class="sm:flex sm:justify-end sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <template v-if="isAuth">
          <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Separator -->
          <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div class="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div class="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Separator -->
              <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

              <!-- Profile dropdown -->
              <Menu as="div" class="relative">
                <MenuButton class="-m-1.5 flex items-center p-1.5">
                  <img v-if="userStore?.user?.avatar" class="h-8 w-8 rounded-full bg-gray-50" :src="userStore?.user?.avatar" alt="" />
                  <span v-else class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{userName}}</span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                </MenuButton>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <router-link :to="item.href" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-2 text-sm leading-6 text-gray-900']">{{ item.name }}</router-link>
                    </MenuItem>
                    <MenuItem @click="logout" v-slot="{ active }">
                      <div :class="[active ? 'bg-gray-100' : '', 'block px-3 py-2 text-sm text-gray-700 cursor-pointer']">
                        Выйти
                      </div>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </template>
        <div v-else class="w-full pt-4 flex justify-end">
          <div
            @click="singIn"
            class="flex items-center cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            <ArrowLeftEndOnRectangleIcon class="h-6 w-6 mr-1" aria-hidden="true" />
            Войти
          </div>
        </div>
        </div>


      <main class="py-10">
        <div v-if="!dictionaryStore.isLoading" class="px-4 sm:px-6 lg:px-8">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { useUserStore } from '@/app/store/modules/user.js'
import iamService from '@/shared/services/iam.service.js'

const navigation = [
  { name: 'Вакансии', href: '/vacancies', icon: HomeIcon, current: true },
  { name: 'Отклики', href: '/reply', icon: ChatBubbleBottomCenterTextIcon, current: true },
  { name: 'База резюме', href: '/applicants', icon: FolderIcon, current: false },
  { name: 'Планирование', href: '/schedule', icon: CalendarIcon, current: false },
]
const teams = [
  { id: 1, name: 'Профиль', href: '/profile', initial: 'П', current: false },
  { id: 2, name: 'Контакты', href: '/contacts', initial: 'К', current: false },
]
const userNavigation = [
  { name: 'Профиль', href: '/profile' },
  { name: 'Контакты', href: '/contacts' },
]

const sidebarOpen = ref(false)
const isLoading = ref(false)
const isLoaded = ref(false)

const route = useRoute()

const userStore = useUserStore()

const currentPage = computed(() => {
  return route.path
})

const dictionaryStore = useDictionaryStore()

const userName = computed(() => {
  const firstName = userStore.user?.firstName
  const lastName = userStore.user?.lastName
  return `${firstName} ${lastName}`
})

const isAuth = computed(() => {
  return userStore?.isAuth || false
})

const singIn = () => {
  const targetUrl = iamService.sdk.getSigninUrl()
  window.location.href = targetUrl
}

const logout = () => {
  userStore.logout()
  const targetUrl = iamService.sdk.getSigninUrl()
  window.location.href = targetUrl

}

const getProfile = async () => {
  isLoading.value = true
  await userStore.fillUser().finally(() => {
    isLoading.value = false
  })
}


onMounted(async () => {
  await dictionaryStore.getAllDictionaries()
    .finally(() => {
      getProfile()
    })



})

</script>
