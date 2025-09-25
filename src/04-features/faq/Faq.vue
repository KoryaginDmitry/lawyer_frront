<script setup>

</script>

<template>
  <div class="faq">
    <ul class="faq__side">

    </ul>
    <div class="faq__main">
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq {
  display: flex;
  align-items: flex-start;
  grid-gap: 1.25rem;

  &__side {
    width: 20rem;
    flex-shrink: 0;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
    background-color: var(--card-color);
    border-radius: 16px;
  }

  &__main {
    width: 100%;
    flex-grow: 1;
    padding: 1.25rem;
    font-size: 1.25rem;
    line-height: 110%;
    color: var(--text-color-1);
    background-color: var(--card-color);
    border-radius: 16px;
  }
}
</style>