

<template>
  <div
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    {{ label }}
  </div>
  <ckeditor
    class="rounded-sm px-4"
    :editor="ClassicEditor"
    :model-value="modelValue"
    @update:modelValue="updateValue"
    :config="editorConfig"
    @focus="onFocus"
  />
  <p v-if="message" class="mt-2 text-sm text-red-600">
    {{ message?.text || message }}
  </p></template>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const editorConfig = {
  toolbar: {
    items: [
      'undo', 'redo',
      '|', 'heading',
      '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
      '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
      '|', 'link',
      '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
    ],
    shouldNotGroupWhenFull: false
  }
}
const emit = defineEmits(["update:modelValue", 'onFocus'])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  label: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
})

const updateValue = (event) => {
  console.log(event)
  emit("update:modelValue", event);
};
const onFocus = (event) => {
  emit("onFocus");
};

</script>

<style scoped>

</style>