import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"
import { camelize } from '@/shared/utils/keyConverter.js'

const toast = useToast()
export const useDictionaryStore = defineStore({
  id: "dictionary",
  state: () => {
    return {
      currencyList: [],
      cityList: [],
      employmentTypeList: [],
      divisionList: [],
      qualificationList: [],
      skillList: [],
      searchStatusList: []
    }
  },
  actions: {
    // Vacancy List
    fillCurrencyList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/currency")
          .then((res) => {
            resolve()
            this.currencyList = res || []
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    fillCityList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/city")
          .then((res) => {
            resolve()
            const data = res || []
            const preparedData = data.map((item) => ({
              ...item,
              key: item.name,
              value: item.fias_id
            })) || []
            this.cityList = camelize(preparedData)
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    fillEmploymentTypeList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/employment_type")
          .then((res) => {
            resolve()
            const data = res || []
            this.employmentTypeList = data.map((item) => ({
              ...item,
              key: item.name,
              value: item.id
            })) || []
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    fillDivisionList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/division")
          .then((res) => {
            resolve()
            const data = res || []
            this.divisionList = data.map((item) => ({
              ...item,
              key: item.name,
              value: item.id
            })) || []
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    fillQualificationList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/qualification")
          .then((res) => {
            resolve()
            const data = res || []
            this.qualificationList = data.map((item) => ({
              ...item,
              key: item.name,
              value: item.id
            })) || []
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    fillSkillList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/skill")
          .then((res) => {
            resolve()
            const data = res || []
            this.skillList = data.map((item) => ({
              ...item,
              key: item.name,
              value: item.id
            })) || []
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
    fillSearchStatusList() {
      return new Promise((resolve, reject) => {
        ApiService
          .get("/dict/search_status")
          .then((res) => {
            resolve()
            const data = res || []
            this.searchStatusList = data.map((item) => ({
              ...item,
              key: item.name,
              value: item.id
            })) || []
          })
          .catch((err) => {
            console.error(err)
            toast.error(err?.message || "Ошибка загрузки списка статусов! Пожалуйста, попробуйте позже")
            reject()
          })
      })
    },
  },
})
