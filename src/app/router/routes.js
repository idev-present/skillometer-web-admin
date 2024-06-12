const routes = [
  {
    path: '/vacancies',
    name: 'VacancyList',
    component: () => import('@/pages/VacancyList.vue')
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: () => import('@/pages/SchedulePage.vue')
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/pages/ProfilePage.vue')
  },
  {
    path: '/contacts',
    name: 'ContactsPage',
    component: () => import('@/pages/ContactsPage.vue')
  },
  {
    path: '/vacancies/view/:id/:status?',
    name: 'VacancyView',
    component: () => import('@/pages/VacancyView.vue')
  },
  {
    path: '/vacancies/:operation/:id?',
    name: 'VacancyPage',
    component: () => import('@/pages/VacancyPage.vue')
  },
  {
    path: '/applicants',
    name: 'ApplicantList',
    component: () => import('@/pages/ApplicantList.vue')
  },
  {
    path: '/applicants/view/:id',
    name: 'Applicant',
    component: () => import('@/pages/ApplicantPage.vue')
  },
  {
    name: 'AuthCallback',
    path: import.meta.env.VITE_IAM_REDIRECT_URI,
    component: () => import('@/pages/AuthCallback.vue')
  },
  // System
  {
    path: '/',
    redirect: '/vacancies',
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
