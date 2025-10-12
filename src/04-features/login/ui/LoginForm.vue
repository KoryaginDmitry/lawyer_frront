<script setup>
import {ref, computed, onMounted} from "vue";
import { useRouter } from "vue-router";
import { Button, Icon, Input } from "@/06-shared/ui/index.js";
import { useUserStore } from "@/05-entities/user/userStore.js";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePassword = () => (showPassword.value = !showPassword.value);

// Валидация
const emailTouched = ref(false);
const passwordTouched = ref(false);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailError = computed(() => {
  if (!emailTouched.value) return "";
  if (!email.value) return "Введите email";
  if (!emailPattern.test(email.value)) return "Неверный формат email";
  return userStore.backendErrors.email || "";
});

const passwordError = computed(() => {
  if (!passwordTouched.value) return "";
  if (!password.value) return "Введите пароль";
  return userStore.backendErrors.password || "";
});

const isSubmitDisabled = computed(() =>
    !email.value || !password.value || userStore.loading
);

const handleSubmit = async (event) => {
  event.preventDefault();
  emailTouched.value = true;
  passwordTouched.value = true;

  if (emailError.value || passwordError.value) return;

  try {
    await userStore.login({ email: email.value, password: password.value });
    router.push("/"); // редирект после успешного логина
  } catch (e) {
    console.error("Ошибка логина:", userStore.error);
  }
};

onMounted(() => {
  userStore.error = null;
  userStore.backendErrors = {};
});
</script>

<template>
  <form class="login-form">
    <Input
        label="Email"
        v-model="email"
        :error="emailError"
        @blur="emailTouched = true"
    />
    <div class="login-form__pass">
      <Input
          label="Пароль"
          :input="{ type: showPassword ? 'text' : 'password' }"
          v-model="password"
          :error="passwordError"
          @blur="passwordTouched = true"
      />
      <Icon :type="showPassword ? 'unlocked' : 'lock'" @click="togglePassword"/>
    </div>
    <Button class="btn__secondary" @click="handleSubmit" :disabled="isSubmitDisabled">
      Войти
    </Button>
    <p v-if="userStore.error" class="login-form__error">
      {{ userStore.error }}
    </p>
  </form>
</template>

<style lang="scss">
.login-form {
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

  &__pass {
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

  &__error {
    font-size: 1.25rem;
    line-height: 110%;
    color: var(--red-1);
    text-align: center;
  }
}
</style>