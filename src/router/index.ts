import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Profile from '@/views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/profile',
      name:"profile",
      component:Profile,
      meta : {
        requiresAuth:true
      }
    }
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem("access")

  if (to.meta.requiresAuth && !token) {
    return "/login"
  }
})


export default router
