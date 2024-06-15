import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/app/router/routes.js'
import { authGuard } from '@/app/router/utils.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
// * enable hooks
router.beforeEach(authGuard);
export default router
