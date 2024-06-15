<script setup>

import BaseCalendar from '@/shared/BaseCalendar.vue'
import EventModal from '@/widgets/EventModal.vue'
import { ref } from 'vue'
import Calendly from '@/shared/Calendly.vue'

const isModal = ref(false)

const onShowModal = () => {
isModal.value = true
}
const onCloseModal = () => {
isModal.value = false
}
const onSubmit = () => {
  console.log('submit')
}

</script>

<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Планирование
      </h1>
      <button
        type="button"
        class="w-full sm:w-fit rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold tr text-white shadow-sm hover:bg-blue-700 outline-0"
        @click="onShowModal"
      >
       Hello World
      </button>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <BaseCalendar/>
<!--            <Calendly-->
<!--              url="https://calendly.com/kiri-katargin"-->
<!--            />-->
          </div>
        </div>
      </div>
    </div>
    <EventModal
      title="Новое событие"
      :visible="isModal"
      @on-confirm="onSubmit"
      @close="onCloseModal"
      cancel-btn-text="Отмена"
      confirm-btn-text="Сохранить"
    />
  </div>
</template>

<style scoped>

</style>