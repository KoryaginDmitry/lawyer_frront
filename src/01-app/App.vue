<script setup>
import { onMounted, onUnmounted } from "vue";
import MainLayout from "@/01-app/layout/MainLayout.vue";
import {useUtilityStore} from "@/06-shared/utils/utilityStore.js";

const utilityStore = useUtilityStore();

onMounted(() => {
  window.addEventListener("resize", handleWindowSizeChange);
  handleWindowSizeChange();
});
onUnmounted(() => {
  window.removeEventListener("resize", handleWindowSizeChange);
});

function handleWindowSizeChange() {
  utilityStore.windowWidth = window.innerWidth;
}
</script>

<template>
  <MainLayout/>
</template>

<style lang="scss">
@use "@/01-app/assets/main.scss";
@use "@/01-app/assets/fonts/icomoon/icons.css";
</style>
