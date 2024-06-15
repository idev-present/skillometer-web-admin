import Cookies from "js-cookie"
import iamService from '@/shared/services/iam.service.js'


export const authGuard = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Cookies.get('skillometer_access_token')) {
      const targetUrl = iamService.sdk.getSigninUrl()
      window.location.href = targetUrl
    } else {
      next();
    }
  } else {
    next();
  }
};

export default {
  authGuard
}