import LoginPage from '@/pages/LoginPage.vue'

const routes = [
  {
    name: 'DashboardPage',
    path: '/dashboard',
    meta: {
      requiredAuth: true
    },
    component: () => import('@/pages/DashboardPage.vue')
  },
  {
    name: 'LoginPage',
    path: '/login',
    meta: {
      requiredAuth: false
    },
    component: LoginPage
  },
  {
    path: '/',
    redirect: '/dashboard',
  }
]

export default routes;
