<script>
export default {
  name: "Skeleton",
  props: ["width", "height"],
  computed: {
    skeletonSize() {
      return `width: ${this.width}px; height: ${this.height}px`;
    },
  },
};
</script>

<template>
  <div class="skeleton-basic" :style="skeletonSize"/>
</template>

<style lang="scss">
.skeleton-basic {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(
          -45deg,
          var(--skeleton-1) 0%,
          var(--skeleton-2) 33.33%,
          var(--skeleton-3) 33.33%,
          var(--skeleton-4) 66.66%,
          var(--skeleton-5) 66.66%
  );
  background-size: 400%;
  animation: shine 2s ease infinite;

  @keyframes shine {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
