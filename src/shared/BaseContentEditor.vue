

<template>
  <div
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    {{ label }}
  </div>
  <ckeditor
    class="rounded-sm"
    :editor="ClassicEditor"
    :model-value="modelValue"
    @update:modelValue=updateValue
    :config="editorConfig"
  >

  </ckeditor>
</template>

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
const emit = defineEmits(["update:modelValue", "uploadCallback"])
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
})

const updateValue = (event) => {
  console.log(event)
  emit("update:modelValue", event);
};

</script>

<style scoped>

</style>