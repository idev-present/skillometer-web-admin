<template>
  <component :is="layout" />
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import SystemLayout from "@/layouts/SystemLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const DEFAULT_LAYOUT = "main";
const SYSTEM_LAYOUT = "system";

const LAYOUT_CONFIG = {
  [DEFAULT_LAYOUT]: MainLayout,
  [SYSTEM_LAYOUT]: SystemLayout,
};

const route = useRoute();

//* computed
const layout = computed(() => {
  return LAYOUT_CONFIG[route?.meta?.layout || DEFAULT_LAYOUT];
});
</script>
