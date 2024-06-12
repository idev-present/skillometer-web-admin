// init core
import { createApp } from 'vue'
import App from '@/app/App.vue'

const app = createApp(App)

// init plugins
import store from '@/app/store/index.js'
import router from '@/app/router/index.js'
import Toast from "vue-toastification";
import CKEditor from '@ckeditor/ckeditor5-vue';
import iamService from "@/shared/services/iam.service.js";


app.use(store)
app.use(router)
app.use(Toast, {})
app.use(CKEditor)
app.use(iamService.Casdoor, iamService.config)


// init styles
import '@/app/assets/styles/tailwind.css'
import '@/app/assets/styles/vendor.css'
import "vue-toastification/dist/index.css";

// init middlewares

app.mount('#app')
