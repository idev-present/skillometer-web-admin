<script setup>
 import { ref } from 'vue'

 const props = defineProps({
   view: String,
   useFormPopup: {
     type: Boolean,
     default: () => undefined
   },
   useDetailPopup: {
     type: Boolean,
     default: () => undefined
   },
   isReadOnly: {
     type: Boolean,
     default: () => undefined
   },
   usageStatistics: {
     type: Boolean,
     default: () => undefined
   },
   eventFilter: Function,
   week: Object,
   month: Object,
   gridSelection: {
     type: [Object, Boolean],
     default: () => undefined
   },
   timezone: Object,
   theme: Object,
   template: Object,
   calendars: Array,
   events: Array
 })

 const calendarInstance = ref(null)

</script>

<template>
  <div ref="container" class="toastui-vue-calendar" />
</template>

<style scoped>

</style>