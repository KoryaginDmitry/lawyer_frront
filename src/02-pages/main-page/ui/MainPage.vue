<script setup>
import {MainFeatures, MainHero, MainReviews, MainWhy} from "@/03-widgets/main/ui/index.js";
import MainTry from "@/03-widgets/main/ui/MainTry.vue";
</script>

<template>
  <div class="main-page">
    <MainHero/>
    <MainFeatures/>
    <MainWhy/>
    <MainReviews/>
    <MainTry/>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 1.25rem 0;
}
</style>