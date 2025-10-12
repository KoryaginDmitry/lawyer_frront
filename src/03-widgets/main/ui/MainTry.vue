<script setup>
import {Button, Icon} from "@/06-shared/ui/index.js";
import {useUtilityStore} from "@/06-shared/utils/utilityStore.js";

const utilityStore = useUtilityStore()
</script>

<template>
  <div class="try">
    <div class="container">
      <h2 class="section-title">{{ !utilityStore.isWindowTabletSize ? "Попробуйте нашего юридического ИИ - бота в Telegram прямо сейчас!" : "Наш юридический ИИ - бот" }}</h2>
      <div class="try__content">
        <a class="try__link" href="https://t.me/PersonalAILawyerBot" target="_blank">
          <Button class="btn__primary">
            <Icon type="telegram"/>
            Написать сообщение
          </Button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints";

.try {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;

  @include breakpoints.media-under-md {
    padding: 2rem 0;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__link {
    > button {
      padding: 1rem 1.25rem;
    }
  }
}
</style>