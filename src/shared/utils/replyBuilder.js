import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { salaryToString } from '@/shared/utils/priceMask.js'
import { getLocalDate } from '@/shared/utils/getLocalDate.js'

const {
  replyStatusList
} = useDictionaryStore()

export const replyBuilder = (reply) => {
  return {
    ...reply,
   statusEntity: {
      status:  replyStatusList.find((item) => item.key === reply.status),
      isRequiredReason: false,
   }
  }
}