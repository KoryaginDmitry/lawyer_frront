<script setup>
import {Button, Input} from "@/06-shared/ui/index.js";
import {ref} from "vue";

const inputValue = ref('')

console.log(inputValue.value)
</script>

<template>
  <div class="feedback">
    <h2 class="section-title">Связь с нами</h2>
    <div class="container">
      <form class="feedback__content">
        <Input label="Ваша почта или телеграм" v-model="inputValue"/>
        <Input label="Вашe сообщение"
               :input="{
                  type: 'textarea',
               }"
        />
        <Button class="btn__secondary feedback__content-btn">Отправить</Button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.feedback {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;
  border-top: 1px solid var(--card-color);

  &__content {
    padding: 1.25rem;
    margin: 0 auto;
    max-width: 39.375rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
    background: var(--card-color);
    border-radius: 16px;

    @include breakpoints.media-under-sm {
      padding: 1.25rem 0.625rem;
    }

    &-btn {
      margin: 0 auto;
    }
  }
}
</style>