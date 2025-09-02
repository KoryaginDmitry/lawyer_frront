<script setup>

import {Button} from "@/06-shared/ui/index.js";
</script>

<template>
  <div class="hero">
    <div class="container">
      <div class="hero__content">
        <h1 class="hero__title">Ваш персональный юридический AI-помощник</h1>
        <p class="hero__subtitle">Мгновенные, точные и развёрнутые ответы на ваши вопросы. Попробуйте
          инновационного юридического ИИ-бота уже сейчас!</p>
        <router-link class="hero__link" :to="{name: 'ChatPage'}">
          <Button class="btn__primary">
            Начать использовать
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.hero {
  padding: 5.5rem 0;

  @include breakpoints.media-under-md {
    padding: 3rem 0;
  }

  @include breakpoints.media-under-sm {
    padding: 0.75rem 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 0.75rem;
    color: var(--text-color-1);
    text-align: center;

    @include breakpoints.media-under-sm {
      grid-gap: 0.5rem;
    }
  }

  &__title {
    font-size: 2.5rem;
    line-height: 100%;

    @include breakpoints.media-under-md {
      font-size: 2rem;
    }

    @include breakpoints.media-under-sm {
      font-size: 1.5rem;
    }
  }

  &__subtitle {
    font-size: 1.5rem;
    line-height: 100%;

    @include breakpoints.media-under-md {
      font-size: 1rem;
    }

    @include breakpoints.media-under-sm {
      font-size: 0.75rem;
    }
  }

  &__link {
    margin-top: 1.25rem;

    > button {
      padding: 1rem 1.25rem;
    }
  }
}
</style>