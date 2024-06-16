<template>
  <Transition name="modal">
    <div
      v-if="visible"
      class="flex justify-center items-center fixed inset-0 modal__wrapper"
      @mousedown.self="onMouseDown"
    >
      <div
        :class="[
          isLarge ? 'modal-content-large' : 'modal-content',
          'block w-full relative overflow-hidden py-5 px-4',
        ]"
      >
        <div
          class="flex w-full items-center h-16 justify-between py-5 px-8 modal-header"
        >
          <span class="text-lg font-medium text-gray-800">
            {{ title || '' }}
          </span>
          <a
            class="cursor-pointer flex items-center button-close"
            @click="close"
          >
            <XMarkIcon
              class="ml-2 w-5 cursor-pointer text-gray-600"
            />
          </a>
        </div>
        <div class="text-base flex flex-col w-full py-5 px-8">
          <div class="py-4">
            <BaseInput
              class="w-full"
              label="Название события"
              v-model="name"
            />
          </div>
          <div class="flex py-4">
            <div class="mr-2">
              <span class="block text-sm font-medium leading-6 text-gray-900">
                Начало
              </span>
              <VueDatePicker
                v-model="startAt"
                format="dd.MM.yyyy HH:mm"
                auto-apply
                locale="ru-RU"
                text-input
              />
              <span class="block text-sm font-medium leading-6 text-red-900">
                {{isDateValid}}
              </span>
            </div>
            <div class="mr-2">
              <span class="block text-sm font-medium leading-6 text-gray-900">
                Окончание
              </span>
              <VueDatePicker
                v-model="endAt"
                format="dd.MM.yyyy HH:mm"
                auto-apply
                locale="ru-RU"
                text-input
              />
            </div>
          </div>
          <BaseSelect
            label="Тип"
            :items="eventTypes"
            v-model="type"
          />
          <div class="py-6">
            <BaseInput
              v-model="payload"
              label="Адрес/телефон"
            />
          </div>
          <BaseSelect
            label="Статус"
            :items="eventStatuses"
            v-model="status"
          />
          <div class="py-4">
            <BaseTextarea
              :key="description"
              label="Описание"
              v-model="description"
            />
          </div>

        </div>
        <div class="modal-footer px-8 pt-4">
          <div class="flex justify-end">
            <base-button
              v-if="cancelBtnText"
              :label="cancelBtnText"
              rounded
              type="secondary"
              @onClick="close"

            />
            <base-button
              v-if="confirmBtnText"
              class="ml-2"
              :label="confirmBtnText"
              rounded
              @onClick="onConfirm"
              @onKeyUpEnter="onConfirm"
              :disabled="isDisabled || !!isDateValid"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
// icons
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/shared/BaseButton.vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import BaseInput from '@/shared/BaseInput.vue'
import BaseTextarea from '@/shared/BaseTextarea.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import BaseSelect from '@/shared/BaseSelect.vue'
import { useEventStore } from '@/app/store/modules/event.js'
import { dateWithoutTimezone, dateWithTimezone } from '@/shared/utils/date.js'

const eventTypes = [
  { key:'ZOOM', value: 'Zoom' },
  { key:'GOOGLE_MEET', value: 'Google Meet' },
  { key:'TELEGRAM', value: 'Telegram' },
  { key:'PHONE', value: 'Телефонный звонок' }
]
const eventStatuses = [
  { key:'PLANNING', value: 'Планирование' },
  { key:'CONFIRMED', value: 'Подтверждение' },
  { key:'WAITING', value: 'Ожидание' },
  { key:'DONE', value: 'Выполнено' }
]
const eventStore = useEventStore()

const props = defineProps({
  id: {
    type: String,
    default:'',
  },
  persistent: {
    type: Boolean,
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  cancelBtnText: {
    type: String,
    default: ''
  },
  confirmBtnText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'onConfirm'])

const name = ref('')
const type = ref(null)
const startAt = ref()
const endAt = ref()
const description = ref('')
const payload = ref('')
const status = ref(null)


//* hooks
onMounted(() => {
  document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 27 && this.persistent) {
      this.close()
    }
  })
})

const isDisabled = computed(() => {
  const data = {
    name: name.value,
    type: type.value?.key,
    startAt: startAt.value,
    endAt: endAt.value,
    payload: payload.value,
  }
  console.log('Object.values(data)', Object.values(data))
  return Object.values(data).some((e) => !e)
})

const isDateValid = computed(() => {
  if(startAt.value && endAt.value) {
    if(new Date(startAt.value) > new Date(endAt.value)) {
      return 'Дата начала не должна быть позже даты окночания'
    }
  }
  return ''
})

//* methods

const onMouseDown = () => {
  if (props.persistent) {
    close()
  }
}
const close = () => {
  emit('close', false)
}
const onConfirm = () => {
  const data = {
    name: name.value,
    type: type.value?.key,
    start_at: startAt.value,
    end_at: endAt.value,
    description: description.value,
    payload: payload.value,
    status: status.value?.key
  }
  emit('onConfirm', data)
}

const currentId = computed(() => {
  return eventStore?.currentEvent?.id
})


onMounted(async () => {
  console.log('props.id', props.id)
  await eventStore.getEvent(props.id)
    .finally(() => {
      console.log('------eventStore?.currentEvent', eventStore?.currentEvent)
      name.value = eventStore?.currentEvent?.name
      type.value = eventTypes.find((el) => el.key === eventStore?.currentEvent?.type)
      startAt.value = new Date(eventStore?.currentEvent?.startAt)
      endAt.value = new Date(eventStore?.currentEvent?.endAt)
      description.value = eventStore?.currentEvent?.description
      payload.value = eventStore?.currentEvent?.payload
      status.value = eventStatuses.find((el) => el.key === eventStore?.currentEvent?.status)
    })

})



</script>

<style lang="scss" scoped>
.modal {
  z-index: 9999;
}

.modal-enter {
  @apply opacity-0;
}

.modal-leave-active {
  @apply opacity-0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}

.modal__wrapper {
  transition: opacity 0.2s ease;
  z-index: 1998;
  background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
  max-width: 600px;
  background-color: white;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 1999;
}

.modal-content-large {
  max-height: 96vh;
  max-width: 96vw;
  background-color: white;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 1999;
}

.button-close {
  fill: black;
  transition: 0.4s;

  &:hover {
    color: blue;
  }
}

.close__icon {
  @apply w-5 h-5;
}
</style>
