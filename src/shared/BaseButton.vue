<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    @click="onClick"
  >
    <slot name="icon_l"></slot>
    <slot>{{ label }}</slot>
    <slot name="icon_r"></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  htmlType: {
    type: String,
    default: "button",
    validator: (val) => ["button", "reset", "submit"].includes(val),
  },
  label: {
    type: String,
    default: "Button",
  },
  type: {
    type: String,
    default: "primary",
    validator: (val) => ["primary", "secondary", "standard"].includes(val),
  },
  size: {
    type: String,
    default: "standard",
    validator: (val) => ["standard", "small", "full"].includes(val),
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onClick"]);

//* methods
const onClick = () => {
  emit("onClick");
};

//* computed
const classes = computed(() => {
  return {
    button: true,
    rounded: props.rounded,
    "size--standard": props.size === "standard",
    "size--small": props.size === "small",
    "size--full": props.size === "full",
    "button--primary": props.type === "primary",
    "button--secondary": props.type === "secondary",
    "button--standard": props.type === "standard",
    "button--disabled": props.disabled,
  };
});
</script>

<style lang="scss" scoped>
.button {
  @apply flex justify-center border border-transparent shadow-sm text-sm font-medium;

  cursor: pointer;
  display: block;
  outline: none;
  white-space: nowrap;
  transition: 0.4s;

  &--primary {
    @apply bg-blue-600 text-white;

    &:hover:not(.button--disabled),
    &:active:not(.button--disabled) {
      @apply bg-blue-700;
    }
  }

  &--secondary {
    @apply bg-gray-300;
    &:hover:not(.button--disabled),
    &:active:not(.button--disabled) {
      @apply bg-gray-200;
    }
  }

  &--standard {
    @apply bg-white;
    color: #2f80ed;

    &:hover:not(.button--disabled),
    &:active:not(.button--disabled) {
      @apply bg-white;
      color: #000;
    }
  }

  &--disabled {
    @apply bg-gray-500;
    cursor: default;
  }
}

.size {
  &--standard {
    @apply py-2 px-4;
  }
  &--small {
    @apply px-3 py-1.5;
  }
  &--full {
    @apply py-2 px-4 w-full;
  }
}

.rounded {
  @apply rounded-md;
}
</style>
