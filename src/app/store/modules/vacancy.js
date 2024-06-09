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
            currentVacancy: null
        }
    },
    actions: {
        // Vacancy List
        fillVacancyList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/vacancy/", payload)
                    .then((res) => {
                        const data = res || []
                      console.log( camelize(data))
                      this.vacancyList = camelize(data)
                        resolve(camelize(data))
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        createVacancy(payload) {
            return new Promise((resolve, reject) => {
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
            })

        },
      getVacancy(payload) {
        return new Promise((resolve, reject) => {
          console.log(payload)
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
        })
      },
      editVacancy(id, payload) {
        return new Promise((resolve, reject) => {
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
        })
      },
      deleteVacancy(id) {
        return new Promise((resolve, reject) => {
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
        })
      }
    },
})
