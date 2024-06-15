<script setup>

import {  getLocalDateTime } from '../shared/utils/getLocalDate.js'
import { ref } from 'vue'
import { useReplyStore } from '@/app/store/modules/reply.js'
import { useUserStore } from '@/app/store/modules/user.js'
import UserAvatar from '@/app/assets/icons/SVG/UserAvatar.vue'


const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  },
  replyId: {
    type: String,
    default: ''
  }
})

const newComment = ref('')

const replyStore = useReplyStore()

const userStore = useUserStore()

const onSend = (e) => {
  e.preventDefault()
  const payload = {
    author_id: userStore?.user?.id,
    author_name: userStore?.user?.fullName,
    content: newComment.value,
  }
  replyStore.sendReplyComment(props.replyId, payload)
    .then(() => {
      replyStore.getReplyComments(props.replyId)
        .then(() => {
          newComment.value = ''
        })
    })
}

</script>

<template>
  <section aria-labelledby="notes-title">
    <div class="bg-white shadow sm:overflow-hidden sm:rounded-lg">
      <div class="divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6">
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">Комментарии</h2>
        </div>
        <div class="px-4 py-6 sm:px-6">
          <ul role="list" class="space-y-8">
            <li v-for="comment in comments" :key="comment.id">
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <UserAvatar classes="h-10 w-10 rounded-full text-gray-400"/>
                </div>
                <div>
                  <div class="text-sm">
                    <a href="#" class="font-medium text-gray-900">{{ comment?.authorName }}</a>
                  </div>
                  <div class="mt-1 text-sm text-gray-700">
                    <p>{{ comment?.content }}</p>
                  </div>
                  <div class="mt-2 space-x-2 text-sm">
                    <span class="font-medium text-gray-500">{{ getLocalDateTime(comment?.createdAt) }}</span>
                    {{ ' ' }}

                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-6 sm:px-6">
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <UserAvatar classes="h-10 w-10 rounded-full text-gray-400"/>
          </div>
          <div class="min-w-0 flex-1">
            <form @submit="onSend">
              <div>
                <label for="comment" class="sr-only">About</label>
                <textarea
                  v-model="newComment"
                  id="comment"
                  name="comment"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Add a note"
                />
              </div>
              <div class="mt-3 flex items-center justify-end">
                <button type="submit"
                        class="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>