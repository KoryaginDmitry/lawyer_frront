<script setup>
import {computed, ref} from "vue";
import { Button, Input } from "@/06-shared/ui/index.js";
import requestConfig from "@/04-features/login/requestConfig.js";
import {useRouter} from "vue-router";

const router = useRouter();

const email = ref("");
const emailTouched = ref(false);
const loading = ref(false);
const errorMessage = ref("");

// эмит для родителя (чтобы показывать preloader)
const emit = defineEmits(["update:loading"]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailError = computed(() => {
  if (!emailTouched.value) return "";
  if (!email.value) return "Введите email";
  if (!emailPattern.test(email.value)) return "Неверный формат email";
  return "";
});

const isSubmitDisabled = computed(() => !email.value || !!emailError.value || loading.value);

const handleSubmit = async (e) => {
  e.preventDefault();
  emailTouched.value = true;
  errorMessage.value = "";

  if (emailError.value) return;

  loading.value = true;
  emit("update:loading", true);

  try {
    const res = await fetch(requestConfig.POSTSendRestoreLink.url, {
      method: requestConfig.POSTSendRestoreLink.type.toUpperCase(),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await res.json();

    if (res.ok) {
      // HTTP 200 — всегда успех
      alert(data.message || "Ссылка отправлена на ваш email");
      email.value = "";
      emailTouched.value = false;
    } else {
      // Любая ошибка от сервера — показываем под формой
      errorMessage.value = data.message ||
          (data.errors ? Object.values(data.errors).flat().join(", ") : "Ошибка при отправке ссылки");
    }
  } catch (err) {
    errorMessage.value = "Произошла ошибка при отправке запроса";
  } finally {
    loading.value = false;
    emit("update:loading", false);
    router.push({name: 'HomePage'})
  }
};
</script>

<template>
  <form class="restore-pass" @submit="handleSubmit">
    <Input
        label="Email"
        v-model="email"
        :error="emailError"
        @blur="emailTouched = true"
    />
    <Button class="btn__secondary" :disabled="isSubmitDisabled">
      Отправить
    </Button>
    <p v-if="errorMessage" class="restore-pass__message">{{ errorMessage }}</p>
  </form>
</template>

<style lang="scss">
.restore-pass {
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;

  .o-field {
    width: 100%;
    grid-gap: 0.35rem;

    .o-field__label {
      font-size: 1rem;
    }

    .o-input {
      .o-input__input {
        padding: 0.625rem 0.625rem;
      }
    }
  }

  >button {
    max-width: 15.625rem;
    width: 100%;
    margin: 0 auto;
  }

  &__message {
    font-size: 1.25rem;
    line-height: 110%;
    color: var(--red-1);
    text-align: center;
  }
}
</style>