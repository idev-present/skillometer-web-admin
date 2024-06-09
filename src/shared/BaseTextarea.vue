<template>
  <div :class="rootClasses">
    <div class="w-full relative">
      <label
        v-if="label"
        :for="name"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {{ label }}
      </label>
      <textarea
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        class="h-20 shadow-sm block w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm border border-gray-300 rounded-md px-3 py-2"
        @change="updateValue"
        @input="updateValue"
        @focus="emit('onFocus')"
      />
    </div>
    <p v-if="message" class="mt-2 text-sm text-red-600">
      {{ message?.text || message }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "info", // error, success
    validator: (value) => {
      return ["error", "info", "success"].indexOf(value) >= 0;
    },
  },
  solo: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: [Number, String],
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue", "onFocus"]);

//* computed

const rootClasses = computed(() => {
  const baseClass = "control";
  const res = [baseClass];
  if (props.disabled) {
    res.push("disabled");
  }
  if (props.status) {
    res.push(`control--status-${props.status}`);
  }
  if (props.solo) {
    res.push("solo");
  }
  return res;
});

//* methods

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped></style>
