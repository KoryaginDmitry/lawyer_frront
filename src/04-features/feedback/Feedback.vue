<script setup>
import {Button, Input} from "@/06-shared/ui/index.js";
import {ref} from "vue";
import requestConfig from "@/04-features/feedback/requestConfig.js";
import {validateContact, validateMessage} from "@/04-features/feedback/validateFeedback.js";
import {useUtilityStore} from "@/06-shared/utils/utilityStore.js";

const utilityStore = useUtilityStore();

const feedbackData = ref({
  contact: null,
  message: null,
})

const errors = ref({
  contact: null,
  message: null,
});

const serverErrors = ref({
  contact: "",
  message: "",
});

function validateField(field) {
  if (field === "contact") {
    errors.value.contact = validateContact(feedbackData.value.contact) || null;
    return !errors.value.contact;
  }

  if (field === "message") {
    errors.value.message = validateMessage(feedbackData.value.message) || null;
    return !errors.value.message;
  }
}

function validateForm() {
  const validContact = validateField("contact");
  const validMessage = validateField("message");
  return validContact && validMessage;
}

const formResetKey = ref(0);

async function sendFeedback() {
  if (!validateForm()) return;
  serverErrors.value = {contact: "", message: ""};

  try {
    const response = await fetch(requestConfig.POSTFeedback.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        contacts: feedbackData.value.contact,
        text: feedbackData.value.message,
      }),
    });

    if (response.status === 422) {
      const result = await response.json();
      serverErrors.value = result.errors;
      return;
    }

    if (!response.ok) {
      throw new Error(response.status)
    }

    const result = await response.json();
    console.log("Успешно отправлено:", result);

    feedbackData.value = {contact: null, message: null};
    errors.value = {contact: null, message: null};

    formResetKey.value += 1;
  } catch (e) {
    console.error("Ошибка при отправке:", e);
  }
}

</script>

<template>
  <div class="feedback">
    <h2 class="section-title">Связь с нами</h2>
    <div class="container">
      <form :key="formResetKey" @submit.prevent class="feedback__content">
        <Input label="Ваша почта или телеграм" v-model="feedbackData.contact"
               :placeholder="!utilityStore.isWindowPhoneSize ? 'Формат @telegramTag или email@email.com' : '@telegram или email@email.com'"
               :error="errors.contact"
               @blur="validateField('contact')"
        />
        <Input label="Вашe сообщение"
               :input="{
                  type: 'textarea'
               }"
               v-model="feedbackData.message"
               :error="errors.message"
               @blur="validateField('message')"
        />
        <Button class="btn__secondary feedback__content-btn" :disabled="!validateForm()" @click="sendFeedback">
          Отправить
        </Button>
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