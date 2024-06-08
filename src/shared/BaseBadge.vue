<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  label: {
    type: String,
    default: ""
  },

})
</script>

<template>
<span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
    {{label}}
    <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
      <span className="sr-only">Remove</span>
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span className="absolute -inset-1" />
    </button>
</span>
</template>

<style scoped>

</style>