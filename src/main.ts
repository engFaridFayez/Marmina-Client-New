import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
const authStore = useAuthStore()

await authStore.initializeAuth()
app.use(router)
app.use(Toast,{
    position: POSITION.BOTTOM_RIGHT
});

app.mount('#app')
