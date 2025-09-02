<script setup>

import {Button, Icon} from "@/06-shared/ui/index.js";
</script>

<template>
  <div class="try">
    <div class="container">
      <h2 class="try__title">Попробуйте нашего юридического ИИ-бота прямо сейчас!</h2>
      <div class="try__content">
        <a class="try__link" href="https://t.me/PersonalAILawyerBot" target="_blank">
          <Button class="btn__primary">
            <Icon type="telegram"/>
            Написать сообщение
          </Button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints";

.try {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;
  border-top: 1px solid var(--card-color);

  @include breakpoints.media-under-md {
    padding: 2rem 0;
  }

  &__title {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    line-height: 100%;
    color: var(--text-color-1);
    text-align: center;

    @include breakpoints.media-under-md {
      font-size: 1.25rem;
    }

    @include breakpoints.media-under-sm {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__link {
    > button {
      padding: 1rem 1.25rem;
    }
  }
}
</style>