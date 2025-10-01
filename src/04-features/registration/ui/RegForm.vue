<script setup>
import {ref, computed} from "vue";
import {useRouter} from "vue-router";
import {Button, Icon, Input} from "@/06-shared/ui/index.js";
import {useRegisterStore} from "@/04-features/registration/model/registerStore.js";

const registerStore = useRegisterStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

// показ пароля
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const togglePassword = () => showPassword.value = !showPassword.value;
const togglePasswordConfirm = () => showPasswordConfirm.value = !showPasswordConfirm.value;

// touched
const touchedEmail = ref(false);
const touchedPassword = ref(false);
const touchedPasswordConfirm = ref(false);

// email проверка
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailError = computed(() => {
  if (!touchedEmail.value) return ""
  if (!email.value) return "Введите email"
  if (!emailPattern.test(email.value)) return "Неверный формат email"
  return registerStore.backendErrors.email?.[0] || ""
});

const passwordError = computed(() => {
  if (!touchedPassword.value) return "";
  if (!password.value) return "Введите пароль";
  if (password.value.length < 6) return "Пароль должен быть не меньше 6 символов";
  return "";
});

const passwordConfirmError = computed(() => {
  if (!touchedPasswordConfirm.value) return "";
  if (!passwordConfirmation.value) return "Подтвердите пароль";
  if (password.value !== passwordConfirmation.value) return "Пароли не совпадают";
  return "";
});

const isSubmitDisabled = computed(() =>
    !email.value || !password.value || !passwordConfirmation.value || registerStore.loading
);

const handleSubmit = async () => {
  touchedEmail.value = true;
  touchedPassword.value = true;
  touchedPasswordConfirm.value = true;

  if (emailError.value || passwordError.value || passwordConfirmError.value) return;

  try {
    registerStore.clearBackendErrors();

    // 1. Регистрируем пользователя (и сразу отправляем письмо внутри register)
    const result = await registerStore.register({
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });

    // 2. Сообщаем пользователю, что письмо отправлено
    alert(`Письмо с подтверждением отправлено на ${email.value}`);

    // 3. Сбрасываем поля и touched
    email.value = "";
    password.value = "";
    passwordConfirmation.value = "";
    touchedEmail.value = false;
    touchedPassword.value = false;
    touchedPasswordConfirm.value = false;

    // Можно редиректить на страницу с инструкцией
    // router.push("/registration/instruction");

  } catch (e) {
    console.error("Ошибка регистрации или отправки письма:", e);
  }
};
</script>

<template>
  <form class="reg-form" @submit.prevent="handleSubmit">
    <Input label="Email" v-model="email" :error="emailError"/>
    <div class="reg-form__pass">
      <Input
          label="Пароль"
          :input="{ type: showPassword ? 'text' : 'password' }"
          v-model="password"
          :error="passwordError"
      />
      <Icon :type="showPassword ? 'unlocked' : 'lock'" @click="togglePassword"/>
    </div>
    <div class="reg-form__pass">
      <Input
          label="Подтвердите пароль"
          :input="{ type: showPasswordConfirm ? 'text' : 'password' }"
          v-model="passwordConfirmation"
          :error="passwordConfirmError"
      />
      <Icon :type="showPasswordConfirm ? 'unlocked' : 'lock'" @click="togglePasswordConfirm"/>
    </div>
    <Button class="btn__secondary" :disabled="isSubmitDisabled">
      Зарегистрироваться
    </Button>
    <p v-if="registerStore.error" class="reg-form__error">{{ registerStore.error }}</p>
  </form>
</template>

<style lang="scss">
.reg-form {
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