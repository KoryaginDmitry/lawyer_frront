<script setup>
import {HeaderWidget} from "@/03-widgets/header";
import {FooterWidget} from "@/03-widgets/footer/index.js";
</script>

<template>
  <div class="main-layout">
    <HeaderWidget/>
    <router-view class="page"/>
    <FooterWidget/>
  </div>
</template>

<style lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .page {
    padding: 1.25rem 0;
    flex-grow: 1;
  }
}
</style>