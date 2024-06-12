import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"
import Cookies from "js-cookie";

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
        }
    },
    actions: {
        fillUser(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/user/profile`, null)
                    .then((res) => {
                        resolve(res || null)
                        this.user = res || null
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
            })
        },
        updateUser(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .put(`/user/profile`, payload)
                    .then((res) => {
                        resolve(res || null)
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
