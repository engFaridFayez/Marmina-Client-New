import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import StagesList from '@/views/admin/StagesList.vue'
// import FamilyDetails from '@/views/admin/FamilyDetails.vue'
import ResultView from '@/views/ResultView.vue'
import TermsView from '@/views/TermsView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import TermsForAttendance from '@/views/TermsForAttendance.vue'
import EditPrompt from '@/views/admin/EditPrompt.vue'
import SettingsView from '@/views/admin/SettingsView.vue'

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
      path: "/att-terms",
      name: "att-terms",
      component: TermsForAttendance,
    },
    {
      path: "/terms/myattendance/:termId",
      name: "my-attendance",
      component: AttendanceView,
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
          path: "settings",
          name: "settings",
          component: SettingsView
        },
        // {
        //   path: "families",
        //   name: "admin-families",
        //   component: FamilyDetails,
        // },
        {
          path: "/stage/:id",
          name: "family-details",
          component: () => import("@/views/admin/StageDetails.vue"),
        },
        {
          path: "/family/:id",
          name: "family-users",
          component: () => import("@/views/admin/FamiliesUsers.vue"),
        },
        {
          path: "addUser",
          name: "add-user",
          component: () => import("@/views/admin/AddUserView.vue"),
        },
        {
          path: "/users/:id",
          name: "user-details",
          component: () => import("@/views/admin/ViewSingleUserView.vue"),
          props: true
        },
        {
          path: "/users/:id/edit",
          name: "edit-user",
          component: () => import("@/views/admin/AddUserView.vue"),
        },
        {
          path: "/edit-prompt",
          name: "edit-prompt",
          component: EditPrompt
        },
        {
          path: "/change-user-password/:id",
          name: "change-user-password",
          component: () => import("@/views/admin/ChangeUserPassword.vue"),
        },
        {
          path: "/change-user-activity/:id",
          name: "change-user-activity",
          component: () => import("@/views/admin/ChangeUserActivity.vue"),
        },
        {
          path: "/update-me",
          name: "update-me",
          component: () => import("@/views/admin/EditOwnDataView.vue"),
        }
      ]
    },


  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

router.beforeEach((to) => {
  const token = localStorage.getItem("access")

  if (to.meta.requiresAuth && !token) {
    return "/login"
  }
})


export default router
