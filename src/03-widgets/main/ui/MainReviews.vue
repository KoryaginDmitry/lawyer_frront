<script setup>
import {Carousel, Slide} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import {ref} from "vue";
import {Rating} from "@/04-features/rating/index.js";

const carouselData = ref([
  {
    text: 'Бот помог мне быстро получить юридическую консультацию. Огромное спасибо!',
    user: 'Ирина П.'
  },
  {
    text: 'Бот помог мне быстро получить юридическую консультацию. Огромное спасибо!',
    user: 'Ирина П.'
  },
  {
    text: 'Бот помог мне быстро получить юридическую консультацию. Огромное спасибо!',
    user: 'Ирина П.'
  },
  {
    text: 'Бот помог мне быстро получить юридическую консультацию. Огромное спасибо!',
    user: 'Ирина П.'
  },
])
</script>

<template>
  <div class="reviews">
    <div class="container">
      <h2 class="reviews__title">Отзывы пользователей</h2>
      <div class="reviews__content">
        <Carousel :items-to-show="1" :wrap-around="true" :gap="20" :mouse-drag="false"
                  :touch-drag="false">
          <Slide class="reviews__item" v-for="(item, index) in carouselData" :key="index">
            <p class="reviews__item-text">{{ item.text }}</p>
            <p class="reviews__item-user">- {{ item.user }}</p>
            <Rating :rating="3.3"/>
          </Slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.reviews {
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
  }

  &__item {
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
    background-color: var(--card-color);
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);

    @include breakpoints.media-under-md {
      width: 100%;
    }

    @include breakpoints.media-under-sm {
      padding: 1rem;
    }
  }

  &__item-text {
    font-size: 1.6rem;
    font-style: italic;
    line-height: 100%;
    color: var(--text-color-1);

    @include breakpoints.media-under-md {
      font-size: 1.4rem;
    }
  }

  &__item-user {
    color: var(--text-color-1);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 100%;

    @include breakpoints.media-under-md {
      font-size: 0.95rem;
    }
  }
}
</style>