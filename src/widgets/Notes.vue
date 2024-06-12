<script setup>

import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid/index.js'

const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.'
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.'
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.'
  }
]

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
}

</script>

<template>
  <section aria-labelledby="notes-title">
    <div class="bg-white shadow sm:overflow-hidden sm:rounded-lg">
      <div class="divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6">
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">Notes</h2>
        </div>
        <div class="px-4 py-6 sm:px-6">
          <ul role="list" class="space-y-8">
            <li v-for="comment in comments" :key="comment.id">
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full"
                       :src="`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`"
                       alt="" />
                </div>
                <div>
                  <div class="text-sm">
                    <a href="#" class="font-medium text-gray-900">{{ comment.name }}</a>
                  </div>
                  <div class="mt-1 text-sm text-gray-700">
                    <p>{{ comment.body }}</p>
                  </div>
                  <div class="mt-2 space-x-2 text-sm">
                    <span class="font-medium text-gray-500">{{ comment.date }}</span>
                    {{ ' ' }}
                    <span class="font-medium text-gray-500">&middot;</span>
                    {{ ' ' }}
                    <button type="button" class="font-medium text-gray-900">Reply</button>
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
            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
          </div>
          <div class="min-w-0 flex-1">
            <form action="#">
              <div>
                <label for="comment" class="sr-only">About</label>
                <textarea id="comment" name="comment" rows="3"
                          class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          placeholder="Add a note" />
              </div>
              <div class="mt-3 flex items-center justify-between">
                <a href="#"
                   class="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900">
                  <QuestionMarkCircleIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true" />
                  <span>Some HTML is okay.</span>
                </a>
                <button type="submit"
                        class="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Comment
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