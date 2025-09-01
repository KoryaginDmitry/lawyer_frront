<script setup>
import {MainFeatures, MainHero, MainWhy} from "@/03-widgets/main/ui/index.js";
</script>

<template>
  <div class="main-page">
    <MainHero/>
    <MainFeatures/>
    <MainWhy/>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 1.25rem 0;
}
</style>