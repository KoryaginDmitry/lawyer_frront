<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/06-shared/ui/index.js";

const route = useRoute();
const router = useRouter();

const status = ref("");      // сообщение для пользователя
const loading = ref(true);   // индикатор загрузки
const error = ref(false);    // флаг ошибки

onMounted(async () => {
  const { id, hash } = route.params;

  if (!id || !hash) {
    status.value = "Некорректная ссылка верификации";
    error.value = true;
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(`https://smart-lawyer-bot.ru/api/verification/verify/${id}/${hash}`);
    const data = await res.json();

    if (!res.ok || !data.status) {
      status.value = data.message || "Ошибка подтверждения почты";
      error.value = true;
    } else {
      status.value = "Почта успешно подтверждена!";
      error.value = false;
    }
  } catch (e) {
    status.value = "Произошла ошибка при подтверждении";
    error.value = true;
  } finally {
    loading.value = false;
  }
});

const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="verify-page">
    <div v-if="loading">Подтверждаем вашу почту...</div>

    <div v-else>
      <p :class="{ error: error }">{{ status }}</p>
      <Button v-if="!error" @click="goToLogin">Перейти на вход</Button>
    </div>
  </div>
</template>

<style scoped>
.verify-page {
  max-width: 500px;
  margin: auto;
  text-align: center;
  padding: 2rem;
}

.error {
  color: red;
  font-weight: bold;
}
</style>