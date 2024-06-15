import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"
import { camelize } from '@/shared/utils/keyConverter.js'
import { vacancyBuilder } from '@/shared/utils/vacancyBuilder.js'

const toast = useToast()


export const useVacancyStore = defineStore({
    id: "vacancy",
    state: () => {
        return {
            vacancyList: [],
            currentVacancy: null,
            isLoading: false
        }
    },
    actions: {
        // Vacancy List
      fillVacancyList(payload = null) {
          return new Promise((resolve, reject) => {
              this.isLoading = true
              ApiService
                  .get("/vacancy/", payload)
                  .then((res) => {
                    const data = res?.length ? camelize(res) : []
                    const preparedData = data.map((item) => vacancyBuilder(item))
                    this.vacancyList = preparedData
                      resolve(preparedData)
                  })
                  .catch((err) => {
                      console.error(err)
                      toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
                      reject()
                  })
                .finally(() => {
                  this.isLoading = false
                })
          })
      },
      createVacancy(payload) {
          return new Promise((resolve, reject) => {
            this.isLoading = true
            console.log(payload)
              ApiService
                .post("/vacancy/", payload)
                .then((res) => {
                    resolve()
                    console.log('res', res)
                })
                .catch((err) => {
                    console.error(err)
                    toast.error(err?.message || "Ошибка создания вакансии! Пожалуйста, попробуйте позже")
                    reject()
                })
                .finally(() => {
                  this.isLoading = false
                })
          })

      },
      getVacancy(payload) {
        return new Promise((resolve, reject) => {
          this.isLoading = true
          ApiService
            .get(`/vacancy/${payload}`)
            .then((res) => {
              const data = res ? camelize(res) : null
              const preparedData = vacancyBuilder(data)
              this.currentVacancy = preparedData
              resolve(preparedData)
              console.log('res', res)
            })
            .catch((err) => {
              console.error(err)
              toast.error(err?.message || "Ошибка загрузки вакансии! Пожалуйста, попробуйте позже")
              reject()
            })
            .finally(() => {
              this.isLoading = false
            })
        })
      },
      editVacancy(id, payload) {
        return new Promise((resolve, reject) => {
          this.isLoading = true
          console.log(payload)
          ApiService
            .put(`/vacancy/${id}`, payload)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              console.error(err)
              toast.error(err?.message || "Ошибка редактирования вакансии! Пожалуйста, попробуйте позже")
              reject()
            })
            .finally(() => {
              this.isLoading = false
            })
        })
      },
      deleteVacancy(id) {
        return new Promise((resolve, reject) => {
          this.isLoading = true
          ApiService
            .delete(`/vacancy/${id}`)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              console.error(err)
              toast.error(err?.message || "Ошибка удаления вакансии! Пожалуйста, попробуйте позже")
              reject()
            })
            .finally(() => {
              this.isLoading = false
            })
        })
      },
      publishVacancy(id){
        return new Promise((resolve, reject) => {
          this.isLoading = true
          ApiService
            .get(`/vacancy/${id}/publish`)
            .then((res) => {
              const data = res ? camelize(res) : null
              const preparedData = vacancyBuilder(data)
              this.currentVacancy = preparedData
              resolve(preparedData)
              console.log('res', res)
            })
            .catch((err) => {
              console.error(err)
              toast.error(err?.message || "Ошибка смены статуса публикации! Пожалуйста, попробуйте позже")
              reject()
            })
            .finally(() => {
              this.isLoading = false
            })
        })
      },
      unpublishVacancy(id){
        return new Promise((resolve, reject) => {
          this.isLoading = true
          ApiService
            .get(`/vacancy/${id}/unpublish`)
            .then((res) => {
              const data = res ? camelize(res) : null
              const preparedData = vacancyBuilder(data)
              this.currentVacancy = preparedData
              resolve(preparedData)
              console.log('res', res)
            })
            .catch((err) => {
              console.error(err)
              toast.error(err?.message || "Ошибка смены статуса публикации! Пожалуйста, попробуйте позже")
              reject()
            })
            .finally(() => {
              this.isLoading = false
            })
        })
      },
    },
})
