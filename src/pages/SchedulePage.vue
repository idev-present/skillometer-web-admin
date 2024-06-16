<script setup>

import BaseCalendar from '@/shared/BaseCalendar.vue'
import EventModal from '@/widgets/EventModal.vue'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/app/store/modules/user.js'
import { useEventStore } from '@/app/store/modules/event.js'
import { useReplyStore } from '@/app/store/modules/reply.js'

const replyStore = useReplyStore()

const isModal = ref(false)
const currentId = ref('')

const onShowModal = () => {
isModal.value = true
}
const onCloseModal = () => {
isModal.value = false
}
const onSubmit = (e) => {
  console.log('---------', e)
  const replyId = eventStore.currentEvent?.id
  if(replyId) {
    eventStore.editEvent(replyId, e)
      .then(() => {
        isModal.value = false
        currentId.value = ''
        if(userId?.value) {
          eventStore.fillEventList(userId.value)
        }
      })
  } else {
    console.error('event id is not define')
  }
  console.log(e)
}

const userStore = useUserStore()
const eventStore = useEventStore()

const userId = computed(() => {
   return userStore?.user?.id
})

const onEdit = (e) => {
  currentId.value = e
  console.log(e)
  if(e) {
    isModal.value = true
  } else {
    console.error('event id is not define')
  }

}
const onDelete = (e) => {
  currentId.value = e

  if(e) {
    eventStore.deleteEvent(e)
      .then(() => {
        if(userId?.value) {
          eventStore.fillEventList(userId.value)
        }
      })
  } else {
    console.error('event id is not define')
  }

}


onMounted(() => {
  if(userId?.value) {
    eventStore.fillEventList(userId.value)
  }
})

</script>

<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Планирование
      </h1>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <BaseCalendar
              @on-edit-event="onEdit"
              @on-delete-event="onDelete"
            />
          </div>
        </div>
      </div>
    </div>
    <EventModal
      v-if="isModal"
      title="Новое событие"
      :visible="isModal"
      :id="currentId"
      @on-confirm="onSubmit"
      @close="onCloseModal"
      cancel-btn-text="Отмена"
      confirm-btn-text="Сохранить"
    />
  </div>
</template>

<style scoped>

</style>