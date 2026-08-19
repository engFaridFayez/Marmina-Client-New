import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
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
app.use(VueSweetalert2);
app.mount('#app')
