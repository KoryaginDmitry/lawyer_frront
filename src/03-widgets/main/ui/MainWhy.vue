<script setup>
</script>

<template>
  <div class="why">
    <div class="container">
      <h2 class="why__title">Почему выбирают нас</h2>
      <div class="why__content">
        <div class="why__item">
          <div class="why__item-icon">⏰</div>
          <h3 class="why__item-title">Доступность 24/7</h3>
          <p class="why__item-subtitle">Наш бот всегда готов помочь, вне зависимости от времени суток.</p>
        </div>
        <div class="why__item">
          <div class="why__item-icon">🎯</div>
          <h3 class="why__item-title">Высокая точность</h3>
          <p class="why__item-subtitle">Используем современные ИИ-модели для максимально точных ответов.</p>
        </div>
        <div class="why__item">
          <div class="why__item-icon">👍</div>
          <h3 class="why__item-title">Дружелюбный интерфейс</h3>
          <p class="why__item-subtitle">Интуитивно понятный и удобный интерфейс для всех пользователей.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.why {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;

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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;

    @include breakpoints.media-under-md {
      flex-direction: column;
      grid-gap: 1.5rem;
    }

    @include breakpoints.media-under-sm {
      grid-gap: 1rem;
    }
  }

  &__item {
    width: 33%;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 0.75rem;
    text-align: center;
    background-color: var(--card-color);
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    border: 1px solid transparent;
    transition: transform 0.6s ease, opacity 0.6s ease, box-shadow 0.3s, border-color 0.3s;

    @include breakpoints.media-under-md {
      width: 100%;
    }

    @include breakpoints.media-under-sm {
      padding: 1rem;
    }

    &:hover {
      transform: translateY(-15px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
      border: 1px solid var(--accent-color-1);

      @include breakpoints.media-under-md {
        transform: translateY(0);
        box-shadow: unset;
        border: unset;
      }
    }

    &-icon {
      font-size: 3rem;
      color: var(--accent-color-1);

      @include breakpoints.media-under-md {
        font-size: 2.5rem;
      }

      @include breakpoints.media-under-sm {
        font-size: 2rem;
      }
    }

    &-title {
      font-size: 1.6rem;
      line-height: 100%;
      color: var(--text-color-1);

      @include breakpoints.media-under-md {
        font-size: 1.4rem;
      }
    }

    &-subtitle {
      color: var(--text-color-1);
      font-size: 1rem;
      line-height: 100%;

      @include breakpoints.media-under-md {
        font-size: 0.95rem;
      }
    }
  }
}
</style>