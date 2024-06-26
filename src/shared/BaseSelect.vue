<template>
  <div>
    <Listbox
      as="div"
      :modelValue="modelValue"
      @update:modelValue="value => onUpdate(value)"
      by="key"
      :defaultValue="items[0]"
      class="min-h-2"
      @onChange={onChange}
    >
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{label}}</ListboxLabel>
      <div class="relative">
        <ListboxButton class="relative min-h-8 w-full cursor-default rounded-sm bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <span class="block truncate">{{ computedValue }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="item in items" :key="item.key" :value="item" v-slot="{ active, selected }">
              <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.value }}</span>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <p v-if="message" class="mt-2 text-sm text-red-600">
      {{ message?.text || message }}
    </p>
  </div>

</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue', 'onFocus'])

const computedValue = computed(() => {
  return props.modelValue?.value || ''
})


const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
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