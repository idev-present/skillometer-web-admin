import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useChatStore = defineStore({
    id: "chat",
    state: () => {
        return {
            chatHistory: [],
        }
    },
    actions: {
        fillChatHistory(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/chat/room/${payload}/history`, null)
                    .then((res) => {
                        resolve(res || [])
                        this.chatHistory = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки истории чата! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        sendChatMessage(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/chat/room/${payload.id}/message`, payload.data)
                    .then((res) => {
                        resolve(res || null)
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка отправки сообщения! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
