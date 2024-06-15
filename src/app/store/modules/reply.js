import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import ApiService from '@/shared/services/api.service.js'
import { camelize } from '@/shared/utils/keyConverter.js'
import { applicantBuilder } from '@/shared/utils/applicationBuilder.js'
import { replyBuilder } from '@/shared/utils/replyBuilder.js'
import { statusDescriptions } from '@/shared/constants.js'

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
      availableStatuses: [],
      comments: [],
      replyCounts: []
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
        this.isLoading = true
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
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getReplyNextStatusFlow(id) {
      return new Promise((resolve, reject) => {
        console.log(id)
        this.isLoading = true
        ApiService
          .get(`/reply/${id}/status`)
          .then((res) => {
            const data = res ? camelize(res) : []
            this.availableStatuses = data.map((item) => ({
              ...item,
              description: statusDescriptions[item?.status?.key]
            }))
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка доступных статусов ! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getReplyComments(id) {
      return new Promise((resolve, reject) => {
        console.log(id)
        this.isLoading = true
        ApiService
          .get(`/reply/${id}/comments`)
          .then((res) => {
            const data = res ? camelize(res) : []
            this.comments = data.reverse()
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка комментариев! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    sendReplyComment(id, payload) {
      return new Promise((resolve, reject) => {
        console.log(id)
        this.isLoading = true
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
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    setReplyStatus(id, payload) {
      return new Promise((resolve, reject) => {
        console.log(id)
        this.isLoading = true
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
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getReplyCounts(id) {
      return new Promise((resolve, reject) => {
        console.log(id)
        this.isLoading = true
        ApiService
          .get(`/reply/${id}/count`)
          .then((res) => {
            const data = res ? camelize(res) : []
            this.replyCounts = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки количества откликов! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
  },
})
