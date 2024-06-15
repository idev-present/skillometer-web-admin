import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import ApiService from '@/shared/services/api.service.js'
import { camelize } from '@/shared/utils/keyConverter.js'
import { applicantBuilder } from '@/shared/utils/applicationBuilder.js'

const toast = useToast()


export const useApplicantStore = defineStore({
  id: "applicant",
  state: () => {
    return {
      applicantList: [],
      currentApplicant: null,
      isLoading: false,
      resume: null
    }
  },
  actions: {
    // Vacancy List
    fillApplicantList(payload = null) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .get("/applicant/", payload)
          .then((res) => {
            const data = res ? camelize(res) : null
            const preparedData = data.map((item) => applicantBuilder(item))
            this.applicantList = preparedData
            resolve(preparedData)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка кандидатов! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getApplicant(payload) {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        ApiService
          .get(`/applicant/${payload}`)
          .then((res) => {
            const data = res ? camelize(res) : null
            const preparedData = applicantBuilder(data)
            this.currentApplicant = preparedData
            resolve(preparedData)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки данных кандидата! Пожалуйста, попробуйте позже")
            reject()
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    fillResume(id) {
      return new Promise((resolve, reject) => {
        ApiService
          .get(`/cv/?applicant_id=${id}`)
          .then((res) => {
            resolve(res || null)
            this.resume = res || null
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки резюме! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    downloadResume(id) {
      return new Promise((resolve, reject) => {
        ApiService
          .get(`/applicant/download/${id}`)
          .then((res) => {
            resolve(res || null)
            this.resume = res || null
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка скачивания резюме! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },

  },
})
