import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import ApiService from '@/shared/services/api.service.js'
import { camelize } from '@/shared/utils/keyConverter.js'
import { applicantBuilder } from '@/shared/utils/applicationBuilder.js'

const toast = useToast()


export const useReplyStore = defineStore({
  id: "reply",
  state: () => {
    return {
      replyList: [],
      currentReply: null,
      isLoading: false,
    }
  },
  actions: {
    // Vacancy List
    fillReplyList(payload = null) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .get("/reply/", payload)
          .then((res) => {
            console.log(res)
            const data = res ? camelize(res) : []
            this.replyList = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка откликов! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getReply(payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        ApiService
          .get(`/reply/${payload}`)
          .then((res) => {
            const data = res ? camelize(res) : null
            this.currentReply = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки отклика! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    getReplyNextStatusFlow(id) {
      return new Promise((resolve, reject) => {
        console.log(id)
        ApiService
          .get(`/reply/${id}/status`)
          .then((res) => {
            const data = res ? camelize(res) : []
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка доступных статусов ! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    }
  },
})
