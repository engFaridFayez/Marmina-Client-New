import { useAuthStore } from "@/stores/auth";
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
import AlhanView from '@/views/AlhanView.vue'

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
      path: "/drive/:id",
      name: "drive",
      component: AlhanView
    },

    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        requireAdmin: true,
        showNav: false,
      },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: Dashboard,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "stages",
          name: "stages",
          component: StagesList,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "settings",
          name: "settings",
          component: SettingsView,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
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
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "/family/:id",
          name: "family-users",
          component: () => import("@/views/admin/FamiliesUsers.vue"),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "addUser",
          name: "add-user",
          component: () => import("@/views/admin/AddUserView.vue"),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "/users/:id",
          name: "user-details",
          component: () => import("@/views/admin/ViewSingleUserView.vue"),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
          props: true
        },
        {
          path: "/users/:id/edit",
          name: "edit-user",
          component: () => import("@/views/admin/AddUserView.vue"),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "/edit-prompt",
          name: "edit-prompt",
          component: EditPrompt,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        {
          path: "/change-user-password/:id",
          name: "change-user-password",
          component: () => import("@/views/admin/ChangeUserPassword.vue"),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        },
        // {
        //   path: "/change-user-activity/:id",
        //   name: "change-user-activity",
        //   component: () => import("@/views/admin/ChangeUserActivity.vue"),
        //   meta: {
        //     requiresAuth: true,
        //     requiresAdmin: true,
        //   }
        // },
        {
          path: "/update-me",
          name: "update-me",
          component: () => import("@/views/admin/EditOwnDataView.vue"),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
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

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem("access");

  // لو مش عامل login
  if (to.meta.requiresAuth && !token) {
    return "/";
  }

  // تحميل user لو مش موجود
  if (token && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (e) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return "/";
    }
  }

  // حماية الأدمن (بتشتغل على parent + children)
  const requiresAdmin = to.matched.some(
    (record) => record.meta.requiresAdmin
  );

  if (requiresAdmin) {
    if (authStore.user?.role === 'مخدوم') {
      return "/";
    }
  }
});


export default router
