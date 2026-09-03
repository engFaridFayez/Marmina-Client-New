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

        // =====================================
        // Results — Dashboard / Families / Enrollments
        // =====================================
        {
          path: "results",
          name: "result-dashboard",
          component: () => import("@/views/admin/results/ResultDashboardView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/families",
          name: "result-families",
          component: () => import("@/views/admin/results/ResultFamiliesView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/families/:familyId",
          name: "result-family",
          component: () => import("@/views/admin/results/ResultFamilyView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "results/students/:studentId/enrollments",
          name: "student-enrollments",
          component: () => import("@/views/admin/results/StudentEnrollments.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "results/enrollments/:enrollmentId",
          name: "enrollment-results",
          component: () => import("@/views/admin/results/EnrollmentResultsView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Result (add / edit)
        // =====================================
        {
          path: "results/enrollments/:enrollmentId/results/new",
          name: "result-create",
          component: () => import("@/views/admin/results/ResultFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "results/enrollments/:enrollmentId/results/:resultId/edit",
          name: "result-edit",
          component: () => import("@/views/admin/results/ResultFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Subjects
        // =====================================
        {
          path: "results/subjects",
          name: "result-subjects",
          component: () => import("@/views/admin/results/ResultSubjectsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/subjects/new",
          name: "subject-create",
          component: () => import("@/views/admin/results/SubjectFormView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/subjects/:subjectId/edit",
          name: "subject-edit",
          component: () => import("@/views/admin/results/SubjectFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Exams
        // =====================================
        {
          path: "results/exams",
          name: "result-exams",
          component: () => import("@/views/admin/results/ResultExamsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/exams/new",
          name: "exam-create",
          component: () => import("@/views/admin/results/ExamFormView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/exams/:examId/edit",
          name: "exam-edit",
          component: () => import("@/views/admin/results/ExamFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Subject Exams (grade per subject per exam)
        // =====================================
        {
          path: "results/subject-exams",
          name: "subject-exams",
          component: () => import("@/views/admin/results/SubjectExamsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/subject-exams/new",
          name: "subject-exam-create",
          component: () => import("@/views/admin/results/SubjectExamFormView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/subject-exams/:subjectExamId/edit",
          name: "subject-exam-edit",
          component: () => import("@/views/admin/results/SubjectExamFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Subject Components (مزامير)
        // =====================================
        {
          path: "results/subject-components",
          name: "subject-components",
          component: () => import("@/views/admin/results/SubjectComponentsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/subject-components/new",
          name: "subject-component-create",
          component: () => import("@/views/admin/results/SubjectComponentFormView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/subject-components/:componentId/edit",
          name: "subject-component-edit",
          component: () => import("@/views/admin/results/SubjectComponentFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Component Exams (grade per component per exam)
        // =====================================
        {
          path: "results/component-exams",
          name: "component-exams",
          component: () => import("@/views/admin/results/ComponentExamsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/component-exams/new",
          name: "component-exam-create",
          component: () => import("@/views/admin/results/ComponentExamFormView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "results/component-exams/:componentExamId/edit",
          name: "component-exam-edit",
          component: () => import("@/views/admin/results/ComponentExamFormView.vue"),
          props: true,
          meta: { requiresAuth: true },
        },

        // =====================================
        // Results — Promotion
        // =====================================
        {
          path: "results/promotion",
          name: "result-promotion",
          component: () => import("@/views/admin/results/ResultPromotionView.vue"),
          meta: { requiresAuth: true },
        },

        // =====================================
        // Users
        // =====================================
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
        {
          path: "/change-own-password",
          name: "change-own-password",
          component: () => import("@/views/admin/UpdateOwnUserPassword.vue"),
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
        },
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },


  ],
  scrollBehavior(to, from, savedPosition) {
    // لو رجوع بالـ browser Back / Forward
    if (savedPosition) {
      return savedPosition;
    }

    // لو الرابط فيه #section
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // أي صفحة جديدة
    return {
      top: 0,
    };
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
    } catch {
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
