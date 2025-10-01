<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button, Input } from "@/06-shared/ui/index.js";
import { useRegisterStore } from "@/04-features/registration/model/registerStore.js";

const registerStore = useRegisterStore();
const router = useRouter();

const code = ref("");
const touchedCode = ref(false);

const codeError = computed(() => {
  if (!touchedCode.value) return "";
  if (!code.value) return "Введите код";
  return registerStore.error || "";
});

const isSubmitDisabled = computed(() => !code.value || registerStore.loading);

const handleSubmit = async () => {
  touchedCode.value = true;
  if (codeError.value) return;

  try {
    await registerStore.verifyCode(code.value);

    alert("Регистрация завершена!");
    router.push("/login");

  } catch (e) {
    console.error("Ошибка подтверждения кода:", e);
  }
};
</script>

<template>
  <form class="send-form" @submit.prevent="handleSubmit">
    <Input label="Код из письма" v-model="code" :error="codeError"/>
    <Button class="btn__secondary" :disabled="isSubmitDisabled">
      Подтвердить и зарегистрироваться
    </Button>
  </form>
</template>

<style lang="scss">
  .send-form {
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

    >button {
      max-width: 15.625rem;
      width: 100%;
      margin: 0 auto;
    }
  }
</style>