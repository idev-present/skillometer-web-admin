import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import ApiService from '@/shared/services/api.service.js'
import { camelize } from '@/shared/utils/keyConverter.js'
import { applicantBuilder } from '@/shared/utils/applicationBuilder.js'
import { replyBuilder } from '@/shared/utils/replyBuilder.js'

const toast = useToast()


export const useReplyStore = defineStore({
  id: "reply",
  state: () => {
    return {
      replyList: [],
      currentReply: {
        statusEntity: null,
      },
      isLoading: false,
      availableStatuses: []
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
            const preparedData = replyBuilder(data)
            this.currentReply = preparedData
            resolve(preparedData)
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
            this.availableStatuses = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка доступных статусов ! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    getReplyComments(id) {
      return new Promise((resolve, reject) => {
        console.log(id)
        ApiService
          .get(`/reply/${id}/comments`)
          .then((res) => {
            const data = res ? camelize(res) : []
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка комментариев! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    sendReplyComment(id, payload) {
      return new Promise((resolve, reject) => {
        console.log(id)
        ApiService
          .post(`/reply/${id}/comments`, payload)
          .then((res) => {
            const data = res ? camelize(res) : []
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка комментариев! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    setReplyStatus(id, payload) {
      return new Promise((resolve, reject) => {
        console.log(id)
        ApiService
          .post(`/reply/${id}/status`, payload)
          .then((res) => {
            console.log(res)
            const data = res ? camelize(res) : []
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка изменения статуса! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
  },
})
