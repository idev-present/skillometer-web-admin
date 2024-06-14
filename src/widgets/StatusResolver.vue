<template>
  <Listbox
    as="div"
    :modelValue="modelValue"
    @update:modelValue="value => onUpdate(value)"
  >
    <ListboxLabel class="sr-only">Change published status</ListboxLabel>
    <div class="relative">
      <div class="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
        <div class="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 px-3 py-2 text-white shadow-sm">
          <CheckIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          <p class="text-sm font-semibold">{{ modelValue?.status?.value }}</p>
        </div>
        <ListboxButton class="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
          <span class="sr-only">Change published status</span>
          <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
        </ListboxButton>
      </div>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ListboxOption as="template" v-for="(option, index) in options" :key="option?.status?.key || index" :value="option" v-slot="{ active, selected }">
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm']">
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <p :class="selected ? 'font-semibold' : 'font-normal'">{{ option?.status?.value || 'Неизвестный статус' }}</p>
                  <span v-if="selected" :class="active ? 'text-white' : 'text-indigo-600'">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <p :class="[active ? 'text-indigo-200' : 'text-gray-500', 'mt-2']">{{option?.description || ''}}</p>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <refuse-modal
      :visible="showRefuseModal"
      title="Отказ"
      cancel-btn-text="Отмена"
      confirm-btn-text="Отправить"
      @on-confirm="updateWithReason"
      @close="closeModal"
    />
  </Listbox>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import RefuseModal from '@/widgets/RefuseModal.vue'
import { useReplyStore } from '@/app/store/modules/reply.js'


const replyStore = useReplyStore()

const showRefuseModal = ref(false)
const tempStatus = ref(null)




const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  options: {
    type: Array,
    default: () => []
  },
  id: {
    type: String,
    default: ''
  },
})

const updateWithReason = (reason) => {
  console.log(reason)
  const payload = {
    status: tempStatus.value,
    reason: reason
  }
  sendStatus(payload)
}

const onUpdate = (e) => {
  console.log(e.status.key)
  if(e?.isRequiredReason && e?.status?.key) {
    showRefuseModal.value = true
    tempStatus.value = e.status.key
  } else {
    const payload = {
      status: e?.status?.key,
      reason: ''
    }
    sendStatus(payload)
  }
}

const closeModal = () => {
  showRefuseModal.value = false
}

const sendStatus = (payload) => {
  replyStore.setReplyStatus(props.id, payload)
    .then(() => {
        replyStore.getReply(props.id)
          .then(() => {
            replyStore.getReplyNextStatusFlow(props.id)
          })
    })
}


</script>