// init core
import { createApp } from 'vue'
import App from '@/app/App.vue'

const app = createApp(App)

// init plugins
import store from '@/app/store/index.js'
import router from '@/app/router/index.js'

app.use(store)
app.use(router)

// init styles
import '@/app/assets/styles/tailwind.css'

// init middlewares

app.mount('#app')
