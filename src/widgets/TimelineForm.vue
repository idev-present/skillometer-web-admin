<template>
  <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
    <div class="bg-white border px-4 pb-4 pt-3 shadow rounded-lg">
      <h2 id="timeline-title" class="text-xl font-bold">
        История
      </h2>

      <!-- Activity Feed -->
      <div class="mt-6 flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(item, itemIdx) in timeline" :key="itemIdx">
            <div class="relative pb-8">
                    <span v-if="itemIdx !== timeline.length - 1"
                          class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div class="relative items-center flex space-x-3">
                <div>
                  <span
                    v-if="item?.target?.key === 'DECLINED'"
                    class="bg-red-500 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                  >
                    <XMarkIcon class="h-5 w-5 text-white" />
                  </span>
                  <span
                    v-else-if="item?.target?.key === 'OFFER_POSTED' || item?.target?.key === 'OFFER_ACCEPTED' || item?.target?.key === 'DONE'"
                    class="bg-green-500 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                  >
                    <CheckIcon class="h-5 w-5 text-white" />
                  </span>
                  <span
                    v-else
                    :class="[item.type.bgColorClass, 'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white']">
                    <component :is="item.type.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <p class="text-sm text-gray-500">
                      {{ item.text }} <span v-if="item?.target?.value" class="font-medium text-gray-900">{{ item.target.value }}</span>
                    </p>
                    <span
                      v-if="item?.target?.key === 'DECLINED'"
                      class="text-sm font-medium text-gray-900"
                    >
                      {{replyStore?.currentReply?.reason || ''}}
                    </span>
                  </div>
                  <div class="whitespace-nowrap flex items-center text-right text-sm text-gray-500">
                    {{ formattedDate ? formattedDate(item.createdAt) : '' }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckIcon, HandThumbUpIcon, UserIcon, XMarkIcon } from '@heroicons/vue/20/solid/index.js'
import {computed} from "vue";
import { REPLY_STATUS_COLOR } from '@/shared/constants.js'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { useReplyStore } from '@/app/store/modules/reply.js'

const props = defineProps({
  userReplyActivity: {type: Array, default: () => []}
})

const replyStore = useReplyStore()
const directoriesStore = useDictionaryStore()


const replyStatusList = computed(() => {
  return directoriesStore?.replyStatusList?.map((item) => ({
    ...item,
    ...REPLY_STATUS_COLOR[item?.key] || null,
  })) || [];
});


const formattedDate = (date) => {
  const dateRes = new Date(date);
  const day = String(dateRes.getDate()).padStart(2, "0");
  const month = String(dateRes.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};


const timeline = computed(() => {
  const resDefault = [{
    id: 1,
    type: eventTypes.applied,
    text: 'Отклик успешно создан',
    createdAt: '2024-06-16T14:15:19.072808Z',
  }]
  const resActivity = props?.userReplyActivity?.map((item) => ({
    ...item,
    text: item?.type === 'REPLY_STATUS' ? `Изменен статус на` : (item?.text || ''),
    target: replyStatusList?.value?.find((e) => e.key === item?.text) || '',
    type: item?.type === 'REPLY_STATUS' ? eventTypes.advanced : eventTypes.advanced,
  })) || []
  return resDefault.concat(resActivity || [])
})

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  error: { icon: XMarkIcon, bgColorClass: 'bg-red-500' }
}
</script>
