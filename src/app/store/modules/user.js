import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"
import Cookies from "js-cookie";
import { camelize } from '@/shared/utils/keyConverter.js'

const toast = useToast()
export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            isAuth: false,
            user: null,
            skillometer_access_token: '',
            skillometer_refresh_token: '',
            expires_in: '',
            isLoading: true,
        }
    },
    actions: {
        fillUser(payload = null) {
            return new Promise((resolve, reject) => {
                this.isLoading = true
                ApiService
                    .get(`/user/profile`, null)
                    .then((res) => {
                        const data = res ? camelize(res) : res
                        resolve(data || null)
                        this.user = data || null
                        this.isAuth = true
                    })
                    .catch((err) => {
                        if(!err?.response?.data?.detail) {
                            console.error(err)
                            toast.error(err?.message || "Ошибка авторизации! Пожалуйста, попробуйте позже")
                        } else {
                            this.isAuth = false
                        }
                        reject()
                    })
                  .finally(() => {
                      this.isLoading = false
                  })
            })
        },
        updateUser(payload = null) {
            return new Promise((resolve, reject) => {
                this.isLoading = true
                ApiService
                    .put(`/user/profile`, payload)
                    .then((res) => {
                        const data = res ? camelize(res) : res
                        resolve(data || null)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        if(!err?.response?.data?.detail) {
                            console.error(err)
                            toast.error(err?.message || "Ошибка редактирования профиля! Пожалуйста, попробуйте позже")
                        } else {
                            this.isAuth = false
                        }
                        reject()
                    })
                  .finally(() => {
                      this.isLoading = false
                  })
            })
        },
        logout(payload = null) {
            // return new Promise((resolve, reject) => {
            //     ApiService
            //         .post(`/user/logout`, null)
            //         .then((res) => {
            //             console.log(res)
            //             resolve(res || null)
            //             this.user = null
            //             this.isAuth = false
            //         })
            //         .catch((err) => {
            //             if(!err?.response?.data?.detail) {
            //                 console.error(err)
            //                 toast.error(err?.message || "Ошибка авторизации! Пожалуйста, попробуйте позже")
            //             } else {
            //                 this.isAuth = false
            //             }
            //             reject()
            //         })
            // })
            Cookies.remove('skillometer_access_token');
            Cookies.remove('skillometer_refresh_token');
            Cookies.remove('expires_in');
            Cookies.remove('skillometer_session_id');
            this.isAuth = false
            this.user = null
        },
    },
})
