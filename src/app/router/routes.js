const routes = [
  {
    path: '/vacancies',
    name: 'VacancyList',
    component: () => import('@/pages/VacancyList.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: () => import('@/pages/SchedulePage.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/contacts',
    name: 'ContactsPage',
    component: () => import('@/pages/ContactsPage.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/vacancies/view/:id/:status?',
    name: 'VacancyView',
    component: () => import('@/pages/VacancyView.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/vacancies/:operation/:id?',
    name: 'VacancyPage',
    component: () => import('@/pages/VacancyPage.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/applicants',
    name: 'ApplicantList',
    component: () => import('@/pages/ApplicantList.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/applicants/view/:id',
    name: 'Applicant',
    component: () => import('@/pages/ApplicantPage.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/reply/view/:id',
    name: 'Reply',
    component: () => import('@/pages/ReplyPage.vue'),
    meta: {
            requiresAuth: true,
        },
  },
  {
    path: '/reply',
    name: 'ReplyList',
    component: () => import('@/pages/ReplyList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'AuthCallback',
    path: import.meta.env.VITE_IAM_REDIRECT_URI,
    component: () => import('@/pages/AuthCallback.vue'),
    meta: {
            requiresAuth: false,
        },
  },
  // System
  {
    path: '/',
    redirect: '/vacancies',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: () => import("@/pages/NotFoundPage.vue"),
    meta: {
      requiresAuth: false,
      layout: "system",
    },
  },
]

export default routes;
