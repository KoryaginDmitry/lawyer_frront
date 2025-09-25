<script setup>
</script>

<template>
  <div class="features">
    <div class="container">
      <h2 class="section-title">Возможности бота</h2>
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
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;

  @include breakpoints.media-under-md {
    padding: 2rem 0;
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