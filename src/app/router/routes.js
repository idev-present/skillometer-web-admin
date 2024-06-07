const routes = [
  {
    path: '/vacancy',
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
  // System
  {
    path: '/',
    redirect: '/vacancy',
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
