import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"
import { camelize } from '@/shared/utils/keyConverter.js'

const toast = useToast()
export const useVacancyStore = defineStore({
    id: "vacancy",
    state: () => {
        return {
            vacancyList: [],
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
                        this.vacancyList = camelize(data)
                        resolve()
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

        }
    },
})
