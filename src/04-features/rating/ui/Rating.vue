<script setup>
import {computed} from 'vue'
import {Icon} from "@/06-shared/ui/index.js";

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  }
})

const safeRating = computed(() => Math.min(props.rating, 5));
const formattedRating = computed(() => Math.round(safeRating.value * 10) / 10);

const starsFill = computed(() => {
  return Array.from({length: 5}, (_, i) => {
    const value = formattedRating.value - i

    if (value >= 1)
      return 100

    if (value > 0)
      return value * 100

    return 0
  })
})
</script>

<template>
  <div class="rating">
    <div class="rating__icons">
      <span
          v-for="(fill, index) in starsFill"
          :key="index"
          class="star"
          :style="{
          '--fill': fill + '%'
        }"
      >
        <Icon type="star"/>
      </span>
    </div>
    <p class="rating__current">{{ formattedRating }}</p>
  </div>
</template>

<style scoped lang="scss">
.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &__icons {
    display: flex;
    gap: 0.125rem;
  }

  .star {
    font-size: 1.25rem;
    display: inline-block;
    position: relative;
    color: var(--gray-1);

    &::after {
      content: attr(data-icon);
    }

    i {
      background: linear-gradient(90deg, #FFD700 var(--fill), #4b5563 var(--fill));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__current {
    width: 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color-1);
    text-align: center;
  }
}
</style>