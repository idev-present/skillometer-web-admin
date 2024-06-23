<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Список откликов
      </h1>
    </div>
    <main class="pb-16 pt-8">
      <div class="mx-auto">
        <div class="tabs px-4 sm:px-0">
          <!-- Tabs -->
          <div class="sm:hidden">
            <select id="tabs" name="tabs"
                    class="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500">
              <option v-for="tab in dictionaryStore.replyStatusList" :key="tab.key" :selected="tab.current">{{ tab.value }}</option>
            </select>
          </div>
          <div class="sm:block">
            <div class="border-b border-gray-200">
              <nav
                class="-mb-px mt-2 flex space-x-8 cursor-pointer overflow-y-auto" aria-label="Tabs">
                <div
                  v-for="tab in tabs"
                  :key="tab.key"
                  :class="[tab.key === currentTab  ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700', 'whitespace-nowrap px-1 py-4 text-sm font-medium']"
                  @click="onTabClick(tab)"
                >
                  {{ tab.value }}
                  <span v-if="tab.count"
                        :class="[tab.key === currentTab ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'ml-2 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block']">{{ tab.count }}
                  </span>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <!-- Stacked list -->
        <ul v-if="replyListSort?.length" role="list" class="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
          <li v-for="reply in replyListSort" :key="reply.id">
            <ReplyListItem
              :id="reply.id"
              :imageUrl="reply.applicantAvatar"
              :name="reply.applicantFullname"
              :email="reply.applicantEmail"
              :status="reply.status"
              :appliedDatetime="reply.updatedAt"
              :matchingResult="reply.matchingResult"
            />
          </li>
        </ul>
        <EmptyState
          v-else
          title="Отклики не найдены"
          description="В данный момент нет откликов с данным статусом"
        />
      </div>
    </main>
    <LoadingIndicator :visible="isLoading" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useReplyStore } from '@/app/store/modules/reply.js'
import ReplyListItem from '@/shared/ReplyListItem.vue'
import EmptyState from '@/shared/EmptyState.vue'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import LoadingIndicator from '@/shared/LoadingIndicator.vue'
import { useRoute, useRouter } from 'vue-router'

const isLoading = ref(false)

const route = useRoute()

const router = useRouter()

const replyStore = useReplyStore()
const dictionaryStore = useDictionaryStore()

const tabs = computed(() => {
  return dictionaryStore.replyStatusList.map((tab) => ({
    ...tab,
    count: replyList?.value.filter((item) => item?.status === tab.key )?.length || 0
  }))
})

const currentTab = computed(() => {
  return route.query?.tab || 'NEW'
})

const replyList = computed(() => {
  return replyStore?.replyList?.map((item) => ({
    ...item,
    matchingResult: {
      coverage: (Math.floor(Math.random() * 101) / 100),
    }
  })) || []
})

const replyListSort = computed(() => {
  return replyList?.value?.filter((item) => item?.status === currentTab?.value ) || []
})

const onTabClick = (tab) => {
  router.push({ query: { tab: tab.key } })
}

onMounted(async () => {
  isLoading.value = true
  await replyStore.fillReplyList().finally(() => {
    isLoading.value = false
  })
})
</script>


<style scoped>

</style>
