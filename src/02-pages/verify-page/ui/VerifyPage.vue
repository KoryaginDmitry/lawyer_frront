<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Button, Preloader} from "@/06-shared/ui/index.js";
import requestConfig from "@/04-features/registration/requestConfig.js";
import { useUserStore } from "@/05-entities/user/userStore.js";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const status = ref("");      // сообщение для пользователя
const loading = ref(true);   // индикатор загрузки
const error = ref(false);    // флаг ошибки

// async function sendEmail() {
//   const email = userStore.email;
//   const token = userStore.token; // или accessToken
//
//   if (!email || !token) {
//     status.value = "Вы не авторизованы для повторной отправки письма";
//     error.value = true;
//     return;
//   }
//
//   loading.value = true;
//   try {
//     const response = await fetch(requestConfig.POSTSendEmail.url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify({ email }),
//     });
//
//     const data = await response.json();
//
//     if (!response.ok || !data.status) {
//       status.value = data.message || "Не удалось отправить письмо повторно";
//       error.value = true;
//     } else {
//       status.value = data.message || "Письмо отправлено повторно!";
//       error.value = false;
//     }
//   } catch (e) {
//     console.error(e);
//     status.value = "Ошибка при повторной отправке";
//     error.value = true;
//   } finally {
//     loading.value = false;
//   }
// }

onMounted(async () => {
  const {id, hash} = route.params;

  if (!id || !hash) {
    status.value = "Некорректная ссылка верификации";
    error.value = true;
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(`https://smart-lawyer-bot.ru/api/verification/verify/${id}/${hash}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    })
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
    <div class="verify-page__content container">
      <div v-if="loading" class="verify-page__loading">
        <p>Подтверждаем вашу почту</p>
        <Preloader width="25" height="25"/>
      </div>
      <div v-else class="verify-page__status">
        <p :class="{ error: error }">{{ status }}</p>
        <Button class="btn__primary" @click="sendEmail">Отправить подтверждение повторно</Button>
        <router-link :to="{name: 'LoginPage'}" class="verify-page__link">
          <Button class="btn__primary" v-if="!error" @click="goToLogin">Войти</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.verify-page {
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 1rem;
  }

  &__loading {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 0.25rem;

    p {
      font-size: 1.5rem;
      line-height: 110%;
      color: var(--text-color-1);
    }
  }

  &__status {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 1rem;

    > p {
      font-size: 1.5rem;
      line-height: 110%;
      color: var(--text-color-1);

      &.error {
        color: var(--red-2);
      }
    }
  }

  &__link {
    max-width: 15.625rem;
    width: 100%;

    > button {
      width: 100%;
    }
  }
}
</style>