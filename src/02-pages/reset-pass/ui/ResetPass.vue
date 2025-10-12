<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button, Icon, Input, Preloader } from "@/06-shared/ui/index.js";
import requestConfig from "@/04-features/login/requestConfig.js";

const router = useRouter();
const route = useRoute();

// поля
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const token = ref(route.query.token || "");

// показать/скрыть пароли
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);
const togglePasswordConfirm = () => (showPasswordConfirm.value = !showPasswordConfirm.value);

// touched
const touchedEmail = ref(false);
const touchedPassword = ref(false);
const touchedPasswordConfirm = ref(false);

// backend ошибки
const backendErrors = ref({});
const error = ref("");

// loading
const loading = ref(false);

// шаблоны
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ошибки
const emailError = computed(() => {
  if (!touchedEmail.value) return "";
  if (!email.value) return "Введите email";
  if (!emailPattern.test(email.value)) return "Неверный формат email";
  return backendErrors.value.email?.[0] || "";
});

const passwordError = computed(() => {
  if (!touchedPassword.value) return "";
  if (!password.value) return "Введите пароль";
  if (password.value.length < 8) return "Пароль должен быть не меньше 8 символов";
  return "";
});

const passwordConfirmError = computed(() => {
  if (!touchedPasswordConfirm.value) return "";
  if (!passwordConfirmation.value) return "Подтвердите пароль";
  if (password.value !== passwordConfirmation.value) return "Пароли не совпадают";
  return "";
});

const isSubmitDisabled = computed(() =>
    !email.value || !password.value || !passwordConfirmation.value || loading.value
);

const handleSubmit = async () => {
  touchedEmail.value = true;
  touchedPassword.value = true;
  touchedPasswordConfirm.value = true;

  if (emailError.value || passwordError.value || passwordConfirmError.value) return;

  loading.value = true;
  backendErrors.value = {};
  error.value = "";

  try {
    const res = await fetch(requestConfig.POSTResetPassword.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        token: token.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      backendErrors.value = data.errors || {};
      error.value = data.message || "Ошибка при сбросе пароля";
      return;
    }

    alert(data.message || "Пароль успешно изменен");

    email.value = "";
    password.value = "";
    passwordConfirmation.value = "";
    touchedEmail.value = false;
    touchedPassword.value = false;
    touchedPasswordConfirm.value = false;

    router.push({ name: "LoginPage" });
  } catch (e) {
    error.value = "Произошла ошибка при отправке запроса";
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="reset-page">
    <router-link class="header__logo" :to="{name: 'HomePage'}">
      <img src="@/06-shared/images/logo.png" alt="GPT Lawyer лого"/>
    </router-link>
    <div class="reset-page__content">
      <h1 class="reset-page__title">Сброс пароля</h1>
      <form class="reset-page__form" @submit.prevent="handleSubmit">
        <Input label="Email" v-model="email" :error="emailError" @blur="touchedEmail = true"/>
        <div class="reset-page__pass">
          <Input
              label="Новый пароль"
              :input="{ type: showPassword ? 'text' : 'password' }"
              v-model="password"
              :error="passwordError"
              @blur="touchedPassword = true"
          />
          <Icon :type="showPassword ? 'unlocked' : 'lock'" @click="togglePassword"/>
        </div>
        <div class="reset-page__pass">
          <Input
              label="Подтвердите новый пароль"
              :input="{ type: showPasswordConfirm ? 'text' : 'password' }"
              v-model="passwordConfirmation"
              :error="passwordConfirmError"
              @blur="touchedPasswordConfirm = true"
          />
          <Icon :type="showPasswordConfirm ? 'unlocked' : 'lock'" @click="togglePasswordConfirm"/>
        </div>
        <Button class="btn__secondary" :disabled="isSubmitDisabled">
          Сбросить пароль
        </Button>
        <p v-if="error" class="reset-page__error">{{ error }}</p>
      </form>
      <transition name="fade">
        <div v-if="loading" class="reset-page__preloader">
          <Preloader width="50" height="50"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
.reset-page {
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;

  &__content {
    position: relative;
    margin: auto;
    padding: 1.25rem 1.5rem;
    max-width: 31.25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 2rem;
    background: var(--card-color);
    border-radius: 16px;
  }

  &__title {
    font-size: 2rem;
    line-height: 100%;
    color: var(--text-color-1);
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    grid-gap: 1.5rem;

    .o-field {
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

    .reset-page__pass {
      position: relative;

      .o-field {
        .o-input {
          .o-input__input {
            padding-right: 2.25rem;
          }
        }
      }

      .icon {
        padding: 10px;
        position: absolute;
        top: 1.5625rem;
        right: 0;
        color: var(--text-color-1);
        cursor: pointer;
      }
    }

    > button {
      max-width: 15.625rem;
      width: 100%;
      margin: 0 auto;
    }
  }

  &__error {
    font-size: 1.25rem;
    line-height: 110%;
    color: var(--red-1);
    text-align: center;
  }

  &__preloader {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--black-2);
    border-radius: 16px;
  }
}
</style>