<template>
  <div class="base-checkbox">
    <div class="relative flex items-start">
      <div class="flex h-6 items-center">
        <input :id="id"
               aria-describedby="comments-description"
               :name="name"
               type="checkbox"
               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
               :checked="modelValue"
               :disabled="disabled"
               @change="onChange"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label :for="id" class="font-medium text-gray-900">{{label}}</label>
        <p v-if="message" id="comments-description" class="text-gray-500">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: 'checkbox'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['onChange', 'update:modelValue'])

//* computed


const onChange = (event) => {
  const data = event.target && event.target.checked !== undefined ? event.target.checked : event
  emit('onChange')
  emit('update:modelValue', data)
}
</script>

<style lang="scss" scoped>
</style>
