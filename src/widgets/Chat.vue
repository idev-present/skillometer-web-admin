<template>
  <div class="border sm:min-w-[360px] h-fit rounded">
    <div
        v-if="!isVisible"
        @click="showChat"
        class="flex border-b justify-between items-center px-4 pb-2 pt-3 cursor-pointer"
    >
      <div class="flex items-center text-xl font-bold">
        <svg viewBox="0 0 34 28" xmlns="http://www.w3.org/2000/svg" class="h-6 mr-3"><path d="M32.76 4.551h-8.019v12.223c0 .737-.554 1.3-1.28 1.3H11.945v3.901c0 .737.555 1.3 1.28 1.3h9.342l6.185 4.465c.213.173.47.26.725.26.213 0 .384-.043.597-.13.427-.217.683-.65.683-1.17v-3.424h1.962c.725 0 1.28-.564 1.28-1.3V5.85c.043-.736-.512-1.3-1.237-1.3z" fill="#D4ECFF"></path><path d="M23.632 18.248c.725 0 1.28-.564 1.28-1.3V1.3c0-.737-.555-1.3-1.28-1.3H1.28C.555 0 0 .563 0 1.3v15.647c0 .737.555 1.3 1.28 1.3h2.9v4.378c0 .52.299.997.768 1.17.17.087.341.13.512.13.299 0 .64-.13.853-.346l5.674-5.331H23.632z" fill="#89B7E2"></path></svg>
        Чат с соисктелем
      </div>
      <div class="flex">
        <div class="cursor-pointer">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-600 hover:text-gray-900" aria-hidden="true" />
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col sm:min-w-[360px] pb-4 bg-white rounded shadow-md h-[550px] chat">
      <div class="flex border-b justify-between px-4 pb-2 pt-3">
        <div class="flex items-center text-xl font-bold">
          <svg viewBox="0 0 34 28" xmlns="http://www.w3.org/2000/svg" class="h-6 mr-3"><path d="M32.76 4.551h-8.019v12.223c0 .737-.554 1.3-1.28 1.3H11.945v3.901c0 .737.555 1.3 1.28 1.3h9.342l6.185 4.465c.213.173.47.26.725.26.213 0 .384-.043.597-.13.427-.217.683-.65.683-1.17v-3.424h1.962c.725 0 1.28-.564 1.28-1.3V5.85c.043-.736-.512-1.3-1.237-1.3z" fill="#D4ECFF"></path><path d="M23.632 18.248c.725 0 1.28-.564 1.28-1.3V1.3c0-.737-.555-1.3-1.28-1.3H1.28C.555 0 0 .563 0 1.3v15.647c0 .737.555 1.3 1.28 1.3h2.9v4.378c0 .52.299.997.768 1.17.17.087.341.13.512.13.299 0 .64-.13.853-.346l5.674-5.331H23.632z" fill="#89B7E2"></path></svg>
          Чат с соискателем
        </div>
        <div class="flex">
          <div @click="closeChat" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600 hover:text-gray-900">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
      <div ref="scrollContainer" class="flex flex-col mt-4 px-4 space-y-3 flex-grow overflow-y-auto">
        <!-- Message Bubble Received -->
        <div v-for="(item, index) in messageList" :key="index"
             class="flex justify-start"
             :class="item?.operator === false && 'justify-end'"
        >
          <div
              v-if="item?.content"
              class="bg-[#F2F4F8] text-gray-900 px-3 py-2 rounded-r-lg rounded-bl-lg shadow text-sm max-w-xs"
              :class="[(!item?.operator && 'message-me')]"
          >
            {{item?.content || ''}}
          </div>
        </div>
      </div>

      <div class="mt-4 px-4 flex relative">
        <div @click="selectFile" class="absolute left-5 top-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600 hover:text-gray-900">
            <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
          </svg>
        </div>
        <input
            v-model="message"
            class="flex-grow border border-gray-300 p-2 pl-8 rounded-l-lg focus:outline-none"
            type="text"
            placeholder="Напишите ваше сообщение"
            @keydown="handleKeyDown"
        >
        <button
            @click="sendMessage"
            class="bg-[#3C5DE3] hover:bg-blue-700 text-white p-2 rounded-r-lg transition-all">
          <PaperAirplaneIcon class="h-5 w-5 text-white-600 mx-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue'
import {useChatStore} from "@/app/store/modules/chat.js"
import {useUserStore} from "@/app/store/modules/user.js";
import {ChevronUpDownIcon, PaperAirplaneIcon} from "@heroicons/vue/20/solid/index.js";
import { useReplyStore } from '@/app/store/modules/reply.js'

const chatStore = useChatStore()
const userStore = useUserStore()
const replyStore = useReplyStore()

const isLoading = ref(false)
const message = ref('')
const isVisible = ref(true)
const scrollContainer = ref(null);
const intervalId = ref(null);

const messageList = computed(() => {
  return chatStore?.chatHistory?.map((item) => ({
    ...item,
    operator: item.from_id !== userStore?.user?.id
  }))
})

// const livechatFiles = (message) => {
//   if(message?.session && message?.id) {
//     chatStore.fetchFile({session: message.session, fileId: message.id})
//     return chatStore?.images?.find((item) => item?.id === message?.id) || ''
//   }
//   return
// }

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
}

const showChat = () => {
  if(!isVisible.value) {
    startRequests()
  }
  isVisible.value = !isVisible.value
};

const startRequests = () => {
  loadHistory()
  stopInterval();
  intervalId.value = setInterval(() => {
    loadHistory()
  }, 5000);
};

const closeChat = () => {
  stopInterval();
  showChat()
}

const sendMessage = async () => {
  const payload = {
    id: replyStore?.currentReply?.chatId,
    data: {
      type: "TEXT",
      content: message.value,
    }
  }
  if(message?.value?.length && replyStore?.currentReply?.chatId) {
    await chatStore.sendChatMessage(payload).finally(() => {
      message.value = ''
      loadHistory()
    })
  } else {
    console.error('Не найден ID для загрузки чата или сообщение пустое')
  }
}

// const selectFile = () => {
//   const input = document.createElement('input');
//   input.type = 'file';
//   input.accept = ['image/png', 'image/jpeg', 'application/pdf'].join(',');
//
//   input.addEventListener('change', (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 500 * 1024) {
//         console.error('max file 500kb')
//       } else {
//         chatStore.sendFile(file);
//       }
//     }
//   });
//
//   input.addEventListener('error', () => {
//     input.remove();
//   });
//
//   input.click();
// };

onMounted(async () => {
  await loadHistory()
  startRequests()
})

const loadHistory = async () => {
  if(replyStore?.currentReply?.chatId) {
    isLoading.value = true
    await chatStore.fillChatHistory(replyStore?.currentReply?.chatId).finally(() => {
      scrollToBottom();
      isLoading.value = false
    })
  } else {
    console.error('Не найден ID для загрузки чата')
  }
}

const scrollToBottom = () => {
  const container = scrollContainer.value
  container.scrollTop = container.scrollHeight
}

const stopInterval = () => {
  clearTimeout(intervalId.value);
};

onUnmounted(() => {
  stopInterval();
});


</script>

<style>
.message-me {
  @apply bg-blue-600;
  color: white;
}
</style>
