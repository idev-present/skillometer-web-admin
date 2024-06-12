<template>
  <loading/>
</template>

<script setup>
import {onMounted} from "vue";
import iamService from "@/shared/services/iam.service.js";
import Loading from "@/shared/Loading.vue";
import {useUserStore} from "@/app/store/modules/user.js";
import Cookies from "js-cookie"

//* store
const userStore = useUserStore()

function login() {
  iamService.sdk.signin(import.meta.env.VITE_API_URL).then((res) => {
    if (res?.access_token) {
      userStore.skillometer_access_token = res?.access_token
      userStore.skillometer_refresh_token = res?.refresh_token
      userStore.expires_in = res?.expires_in
      Cookies.set('skillometer_access_token', res?.access_token)
      Cookies.set('skillometer_refresh_token', res?.refresh_token)
      Cookies.set('expires_in', res?.expires_in)
      if (inIframe()) {
        const message = {tag: "Casdoor", type: "SilentSignin", data: "success"};
        window.parent.postMessage(message, "*");
      }
      window.location.href = '/'
    } else {
      alert('Login failed')
      window.location.href = '/'
    }
  })
}

function inIframe() {
  try {
    return window !== window.parent;
  } catch (e) {
    return true;
  }
}

onMounted(() => {
  login()
})
</script>
