<script setup>
import {Button, Input} from "@/06-shared/ui/index.js";
import {ref} from "vue";
import requestConfig from "@/04-features/feedback/requestConfig.js";

const feedbackData = ref({
  contact: '',
  message: '',
})


async function sendFeedback() {
  try {
    const response = await fetch(requestConfig.POSTFeedback.url, {
      method: "POST",
      body: JSON.stringify({
        contacts: feedbackData.value.contact,
        text: feedbackData.value.message,
      }),
    });
    if (!response.ok) {
      throw new Error(response.status)
    }

    console.log(feedbackData.value);
    console.log(response);

    const result = await response.json();
    console.log("Успешно отправлено:", result);

    feedbackData.value = {contact: "", message: ""};
  } catch (e) {
    console.error("Ошибка при отправке:", e);
  }
}

</script>

<template>
  <div class="feedback">
    <h2 class="section-title">Связь с нами</h2>
    <div class="container">
      <form @submit.prevent class="feedback__content">
        <Input label="Ваша почта или телеграм" v-model="feedbackData.contact"/>
        <Input label="Вашe сообщение"
               :input="{
                  type: 'textarea',
               }"
               v-model="feedbackData.message"
        />
        <Button class="btn__secondary feedback__content-btn" @click="sendFeedback">Отправить</Button>
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