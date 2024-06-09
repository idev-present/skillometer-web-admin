const routes = [
  {
    path: '/vacancies',
    name: 'VacancyList',
    component: () => import('@/pages/VacancyList.vue')
  },
  {
    name: 'LoginPage',
    path: '/login',
    meta: {
      requiredAuth: false
    },
    component: () => import('@/pages/LoginPage.vue')
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: () => import('@/pages/SchedulePage.vue')
  },
  {
    path: '/replies/:status?',
    name: 'RepliesPage',
    component: () => import('@/pages/RepliesPage.vue')
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
