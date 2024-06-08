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
    path: '/vacancies/:id/:operation?',
    name: 'VacancyPage',
    component: () => import('@/pages/VacancyPage.vue')
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
