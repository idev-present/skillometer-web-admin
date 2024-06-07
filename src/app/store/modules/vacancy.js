import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

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
                    .get("/vacancy", payload)
                    .then((res) => {
                        resolve()
                        this.vacancyList = res?.data || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
