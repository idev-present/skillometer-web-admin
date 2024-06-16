import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import ApiService from '@/shared/services/api.service.js'
import { camelize } from '@/shared/utils/keyConverter.js'

const toast = useToast()


export const useEventStore = defineStore({
  id: "event",
  state: () => {
    return {
      eventList: [],
      isLoading: false,
      currentEvent: {}
    }
  },
  actions: {
    // Vacancy List
    fillEventList(recId) {
      console.log('payload', recId)
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .get(`/events/?recruiter_id=${recId}` )
          .then((res) => {
            const data = res ? camelize(res) : []
            this.eventList = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка данных планировщика! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getEvent(id) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .get(`/events/${id}` )
          .then((res) => {
            const data = res ? camelize(res) : null
            this.currentEvent = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка получения записи! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    editEvent(id, payload) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .put(`/events/${id}`, payload )
          .then((res) => {
            const data = res ? camelize(res) : null
            this.currentEvent = data
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка получения записи! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    deleteEvent(id) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .delete(`/events/${id}` )
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка удаления записи! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
  },
})
