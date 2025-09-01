<script setup>
</script>

<template>
  <div class="features">
    <div class="container">
      <h2 class="features__title">Возможности бота</h2>
      <div class="features__content">
        <transition-group name="fade">
          <div class="features__item">
            <div class="features__item-icon">💬</div>
            <h3 class="features__item-title">Ответы на любые вопросы</h3>
            <p class="features__item-subtitle">Получайте актуальные и точные ответы мгновенно.</p>
          </div>
          <div class="features__item">
            <div class="features__item-icon">📄</div>
            <h3 class="features__item-title">Обработка текстов и документов</h3>
            <p class="features__item-subtitle">Анализ, суммирование, генерация текстов.</p>
          </div>
          <div class="features__item">
            <div class="features__item-icon">🔗</div>
            <h3 class="features__item-title">Интеграция</h3>
            <p class="features__item-subtitle">Встраивание в популярный мессенджер.</p>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.features {
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;

  &__title {
    font-size: 2rem;
    line-height: 100%;
    color: var(--text-color-1);
    text-align: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;

    @include breakpoints.media-under-md {
      grid-gap: 1.5rem;
    }

    @include breakpoints.media-under-sm {
      grid-gap: 1rem;
    }
  }

  &__item {
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
    transform: translateY(15px);
    transition: transform 0.6s ease, opacity 0.6s ease, box-shadow 0.3s, border-color 0.3s;

    @include breakpoints.media-under-sm {
      padding: 1rem;
    }

    &:hover {
      transform: translateY(-4px);
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