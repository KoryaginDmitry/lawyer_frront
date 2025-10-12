<script setup>
import SubsCard from "@/04-features/subs/SubsCard.vue";

</script>

<template>
  <div class="subs-page">
    <div class="container">
      <h2 class="section-title">Планы</h2>
      <div class="subs-page__content">
        <SubsCard/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/06-shared/assets/breakpoints";

.subs-page {

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    @include breakpoints.media-under-md {
      grid-template-columns: 1fr;
    }

    .skeleton-basic {
      height: 24.375rem;
      border-radius: 16px;

      @include breakpoints.media-under-md {
        height: 20.75rem;
      }
    }
  }
}
</style>