<script setup>
import {Carousel, Slide} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import {ref} from "vue";
import {Rating} from "@/04-features/rating/index.js";
import requestConfig from "@/04-features/reviews/requestConfig.js"
import {Skeleton} from "@/06-shared/ui/index.js";

const carouselData = ref([]);

async function getReviews() {
  try {
    const response = await fetch(requestConfig.GETReviews.url);
    if (!response.ok) {
      throw new Error(response.status)
    }
    const data = await response.json();
    console.log(data);
    carouselData.value = data.data.map((item) => ({
      rating: item.grade ?? 5,
      text: item.text,
      user: item.user.name,
    }))
  } catch (e) {
    console.error(e);
  }
}

getReviews();
</script>

<template>
  <div class="reviews">
    <div class="container">
      <h2 class="reviews__title">Отзывы пользователей</h2>
      <div class="reviews__content">
        <Carousel :items-to-show="1"
                  :gap="20"
                  :autoplay="3000"
                  :mouse-drag="false"
                  :wrap-around="true"
                  :touch-drag="false"
        >
          <Slide v-if="carouselData.length" class="reviews__item" v-for="(item, index) in carouselData" :key="index">
            <p class="reviews__item-text">"{{ item.text.length > 300 ? item.text.slice(0, 300) + '...' : item.text }}"</p>
            <p class="reviews__item-user" v-if="item.user">- {{ item.user }}</p>
            <Rating :rating="item.rating"/>
          </Slide>
          <template v-else>
            <Slide v-for="index in 5" :key="index">
              <Skeleton width="100%" height="190"/>
            </Slide>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints";

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
    text-align: center;

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