<script setup>
import {ProfileTab} from "@/03-widgets/profile/index.js";

</script>

<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-page__content">
        <ul class="profile-page__sidebar">
          <li class="profile-page__sidebar-item">Профиль</li>
        </ul>
        <div class="profile-page__main">
          <ProfileTab/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  &__content {
    display: flex;
    flex-direction: row;
    grid-gap: 1.25rem;
  }

  &__sidebar {
    width: 20rem;
    flex-shrink: 0;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
    background-color: var(--card-color);
    border-radius: 16px;
  }

  &__sidebar-item {
    padding: 0.3125rem 0.625rem;
    font-size: 1.125rem;
    line-height: 110%;
    color: var(--text-color-1);
  }

  &__main {
    width: 100%;
    padding: 1.25rem;
    background-color: var(--card-color);
    border-radius: 16px;
  }
}
</style>