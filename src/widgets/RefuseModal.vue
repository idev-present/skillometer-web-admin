<template>
  <Transition name="modal">
    <div
      v-if="visible"
      class="flex justify-center items-center fixed inset-0 modal__wrapper"
      @mousedown.self="onMouseDown"
    >
      <div
        :class="[
          isLarge ? 'modal-content-large' : 'modal-content',
          'block w-full relative overflow-hidden py-5 px-4',
        ]"
      >
        <div
          class="flex w-full items-center h-16 justify-between py-5 px-8 modal-header"
        >
          <span class="text-lg font-medium text-gray-800">
            {{ title || "" }}
          </span>
          <a
            class="cursor-pointer flex items-center button-close"
            @click="close"
          >
            <XMarkIcon
              class="ml-2 w-5 cursor-pointer text-gray-600"
            />
          </a>
        </div>
        <div class="text-base flex w-full items-center  py-5 px-8">
          <BaseTextarea
            class="w-full"
            label="Введите причину отказа"
          />
        </div>
        <div class="modal-footer px-8 pt-4">
          <div class="flex justify-end">
            <base-button
              v-if="cancelBtnText"
              :label="cancelBtnText"
              rounded
              type="secondary"
              @onClick="close"
            />
            <base-button
              v-if="confirmBtnText"
              class="ml-2"
              :label="confirmBtnText"
              rounded
              :disabled="isConfirmDisabled"
              @onClick="onConfirm"
              @onKeyUpEnter="onConfirm"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
// icons
import { onMounted } from "vue";
import BaseButton from '@/shared/BaseButton.vue'
import { XMarkIcon } from "@heroicons/vue/20/solid";
import BaseTextarea from '@/shared/BaseTextarea.vue'


const props = defineProps({
  persistent: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  cancelBtnText: {
    type: String,
    default: "",
  },
  confirmBtnText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "onConfirm"]);

//* hooks
onMounted(() => {
  document.body.addEventListener("keyup", (e) => {
    if (e.keyCode === 27 && this.persistent) {
      this.close();
    }
  });
});

//* methods

const onMouseDown = () => {
  if (props.persistent) {
    close();
  }
};
const close = () => {
  emit("close", false);
};
const onConfirm = () => {
  emit("onConfirm");
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 9999;
}

.modal-enter {
  @apply opacity-0;
}

.modal-leave-active {
  @apply opacity-0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}

.modal__wrapper {
  transition: opacity 0.2s ease;
  z-index: 1998;
  background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
  max-width: 600px;
  background-color: white;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 1999;
}

.modal-content-large {
  max-height: 96vh;
  max-width: 96vw;
  background-color: white;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 1999;
}

.button-close {
  fill: black;
  transition: 0.4s;

  &:hover {
    color: blue;
  }
}

.close__icon {
  @apply w-5 h-5;
}
</style>
