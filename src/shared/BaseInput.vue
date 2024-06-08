<template>
  <div class="">
    <span v-if="label" class="label">
      <sup v-if="star">*</sup>
      {{ label }}
    </span>
    <div :class="rootClasses">
      <div class="control__field flex w-full relative">
        <div
          v-if="iconLeft || $slots.iconLeft"
          class="control__icon control__icon--left flex items-center justify-center"
        >
        </div>
        <input
          ref="input"
          v-maska="maskOptions"
          :name="name"
          :class="inputClasses"
          :type="type"
          :disabled="disabled"
          :placeholder="placeholder"
          :value="modelValue"
          :tabindex="tabindex"
          :maxlength="maxlength"
          :max="max"
          :min="min"
          autocomplete="on"
          :readonly="readonly"
          @input="updateValue"
          @blur="onBlur"
          @keyup.enter="keyUpEnter"
          @paste="onPaste"
          @focus="onFocus"
        />
        <small
          v-if="innerLabel"
          class="control__label absolute"
          :class="{ 'control__label--active': !!modelValue }"
        >
          {{ innerLabel }}
        </small>
        <div
          v-if="iconRight || $slots.iconRight"
          class="control__icon control__icon--right flex items-center justify-center"
        >
        </div>
      </div>
      <small v-if="message" class="control__message">
        {{ message?.text || message }}
      </small>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from "vue";
import { vMaska } from 'maska/vue'

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  star: {
    type: Boolean,
    default: false,
  },
  innerLabel: {
    type: String,
    default: "",
  },
  message: {
    type: [Object, String],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "info", // error, success
    validator: (value) => {
      return ["error", "info", "success"].includes(value);
    },
  },
  type: {
    type: String,
    default: "text",
    validator: (value) => {
      const result = ["text", "number", "date", "tel"].includes(value);
      if (!result) {
        return value;
      }
      return true;
    },
  },
  iconLeft: {
    type: String,
    default: "",
  },
  iconRight: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: [Number, String],
    default: 0,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: String,
    default: "",
  },
  max: {
    type: Number,
    default: undefined,
  },
  min: {
    type: Number,
    default: undefined,
  },
  isSmall: {
    type: Boolean,
    default: false,
  },
  maskOptions: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  "update:modelValue",
  "onBlur",
  "keyUpEnter",
  "onPaste",
  "onFocus",
]);

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
  if (props.iconLeft || slots.iconLeft) {
    res.push("has-icon-left");
  }
  if (props.iconRight || slots.iconRight) {
    res.push("has-icon-right");
  }
  if (props.isSmall) {
    res.push("small");
  }
  return res;
});

const inputClasses = computed(() => {
  const baseClass = "input";
  const res = [baseClass];
  res.push("jumbotron__input");
  if (props.iconLeft || slots.iconLeft) {
    res.push("has-icon-left");
  }
  if (props.iconRight || slots.iconRight) {
    res.push("has-icon-right");
  }
  return res;
});

//* methods

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const onBlur = (event) => {
  emit("onBlur", event?.target?.value || "");
};

const keyUpEnter = (event) => {
  emit("keyUpEnter", event?.target?.value || "");
};

const onPaste = (event) => {
  emit("onPaste", event?.target?.value || "");
};

const onFocus = (event) => {
  emit("onFocus", event?.target?.value || "");
};

const onClear = () => {
  emit("update:modelValue", "");
};
</script>

<style lang="scss" scoped>

.control {
  @apply flex flex-col relative w-full;
  display: inline-block;
  position: relative;
  color: black;
  border-radius: 4px;

  .control__field {
    .input {
      @apply text-sm pt-1.5 pb-1.5 px-2.5;
      border-radius: 4px;
      flex: 1 0;
      width: 100%;
      box-shadow: none;
      border: 1px solid #e8e8e8;

      &:focus {
        outline: 0;

        + .control__label {
          top: 0;
          font-size: 0.75rem;
        }
      }

      &.has-icon-left {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding-left: 0;
        border-left: 0;

        & + .control__label {
          left: 2rem;
        }
      }

      &.has-icon-right {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding-right: 0;
        border-right: 0;
      }
    }

    .control__icon {
      @apply bg-white;
      padding: 0.35rem;
      border: 1px solid transparent;
      color: currentColor;

      &--left {
        border-right: 0;
        border-radius: 4px 0 0 4px;
      }

      &--right {
        border-radius: 0 4px 4px 0;
        border-left: 0;
      }

      .svg-icon {
        font-size: 1.15rem;

        &--eye {
          opacity: 0.5;
        }

        &:active {
          opacity: 0.7;
        }
      }
    }

    input::-webkit-input-placeholder {
      color: gray;
    }

    input::-moz-placeholder {
      color: gray;
    }

    .control__label {
      left: 0.75rem;
      top: 0.75rem;
      font-size: 0.875rem;
      color: gray;
      pointer-events: none;
      transition: all 0.2s ease;
    }

    .control__label--active {
      outline: 0;
      top: 0;
      font-size: 0.75rem;
    }

    .clearable {
      padding: 4px 8px !important;
      cursor: pointer;

      .control__clearable {
        font-size: 0.875rem;
      }
    }
  }
  .control__message {
    @apply text-xs absolute left-0 whitespace-nowrap overflow-ellipsis overflow-hidden;
    color: red;
    max-width: 100%;
  }

  &.has-icon-left {
    .control__message {
      left: 2.75rem;
    }
  }

  &--status-error {
    border: 1px solid red;

    .control__message,
    .control__field .control__label {
      color: red;
    }
  }

  &.small {
    .control__field {
      .input {
        height: 20px;
        padding: 0.5rem 0.25rem;
        font-size: 0.75rem;
      }
    }
  }

  &.disabled {
    .input {
      color: black;
      @apply cursor-not-allowed;
    }
  }

  & + .control {
    margin-top: 1.25rem;
  }
}

.label {
  @apply block text-sm font-medium leading-6 text-gray-900;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
