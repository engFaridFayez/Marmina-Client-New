import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import StagesList from '@/views/admin/StagesList.vue'
import FamilyDetails from '@/views/admin/FamilyDetails.vue'
import ResultView from '@/views/ResultView.vue'
import TermsView from '@/views/TermsView.vue'

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
      path: "/terms",
      name: "terms",
      component: TermsView,
    },

    {
      path: "/terms/myresult/:examId",
      name: "my-result",
      component: ResultView,
      props: true,
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
          name: "admin-dashboard",
          component: Dashboard
        },
        {
          path: "stages",
          name: "stages",
          component: StagesList,
        },
        {
          path: "families",
          name: "admin-families",
          component: FamilyDetails,
        },
        {
          path: "/stage/:id",
          name: "family-details",
          component: () => import("@/views/admin/StageDetails.vue"),
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
