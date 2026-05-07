import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Stages from '@/views/admin/Stages.vue'
import AdminFamilies from '@/views/admin/AdminFamilies.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        showNav: false,
      },
      children: [
        {
          path: "",
          component: Dashboard
        },
        {
          path: "stages",
          name: "stages",
          component: Stages,
        },
        {
          path: "families",
          name: "admin-families",
          component: AdminFamilies,
        },
        {
          path: "/families/:id",
          name: "family-details",
          component: () => import("@/views/admin/GenericFamilies.vue"),
        },
        {
          path: "/family/:id",
          name: "family-users",
          component: () => import("@/views/admin/FamiliesUsers.vue"),
        }
      ]
    },


  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem("access")

  if (to.meta.requiresAuth && !token) {
    return "/login"
  }
})


export default router
