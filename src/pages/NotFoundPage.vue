<template>
  <div class="min-h-[100vh] w-full flex justify-center items-center place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center flex flex-col items-center">
      <div class="flex relative">
        <span class="absolute left-8 -top-4 font-bold">Admin</span>
        <router-link to="/" class="-mx-1.5 -mt-2 p-1.5">
          <img class="h-10 w-auto" src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png" alt="" />
        </router-link>
      </div>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Страница не найдена
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        К сожалению, мы не смогли найти страницу, которую вы ищете.
      </p>
      <router-link to="/" class="mt-6 w-fit rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0">
        Перейти на главную
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
