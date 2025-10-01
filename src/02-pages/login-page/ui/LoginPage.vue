<script setup>
import LoginForm from "@/04-features/login/ui/LoginForm.vue";
import {Preloader} from "@/06-shared/ui/index.js";
import {useUserStore} from "@/05-entities/user/userStore.js";

const userStore = useUserStore()
</script>

<template>
  <div class="login-page">
    <router-link class="header__logo" :to="{name: 'HomePage'}">
      <img src="@/06-shared/images/logo.png" alt="GPT Lawyer лого"/>
    </router-link>
    <div class="login-page__content">
      <h1 class="login-page__title">Вход</h1>
      <LoginForm/>
      <transition name="fade">
        <div v-if="userStore.loading" class="login-page__preloader">
          <Preloader width="50" height="50"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;

  &__content {
    position: relative;
    margin: auto;
    padding: 1.25rem 1.5rem;
    max-width: 31.25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 2rem;
    background: var(--card-color);
    border-radius: 16px;
  }

  &__title {
    font-size: 2rem;
    line-height: 100%;
    color: var(--text-color-1);
    text-align: center;
  }

  &__preloader {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--black-2);
    border-radius: 16px;
  }
}
</style>