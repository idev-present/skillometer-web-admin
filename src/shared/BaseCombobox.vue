<template>
  <div>
    <Combobox
      as="div"
      :multiple="multiple"
      :modelValue="modelValue"
      @update:modelValue="value => onUpdate(value)"
    >
      <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</ComboboxLabel>
      <div class="relative">
        <ComboboxButton class="relative w-full">
          <ComboboxInput
            class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            @change="query = $event.target.value" @blur="query = ''" :display-value="(item) => item?.value" />
          <div class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </ComboboxButton>

        <ComboboxOptions v-if="filteredData.length > 0"
                         class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="item in filteredData" :key="item.key" :value="item" as="template"
                          v-slot="{ active, selected }">
            <li
              :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ item.value }}
            </span>

              <span v-if="selected"
                    :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <p v-if="message" class="mt-2 text-sm text-red-600">
      {{ message?.text || message }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/vue'

const query = ref('')
const filteredData = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) => {
      return item.key.toLowerCase().includes(query.value.toLowerCase())
    })
)

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  items: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
})

const onUpdate = (value) => {
  emit('update:modelValue', value)
  emit('onFocus')
}

</script>
