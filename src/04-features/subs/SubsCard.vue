<script setup>
import requestConfig from "@/04-features/subs/requestConfig.js";
import {onMounted, ref} from "vue";
import {Button, Icon, Preloader} from "@/06-shared/ui/index.js";
import Skeleton from "@/06-shared/ui/Skeleton/Skeleton.vue";
import {useUserStore} from "@/05-entities/user/userStore.js";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const plansData = ref([]);
const loading = ref(true);
const isFrozen = ref(false);
const buyLoading = ref(null); // id плана, который сейчас покупаем

async function getPlans() {
  loading.value = true;
  try {
    const response = await fetch(requestConfig.GETPlans.url);
    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    plansData.value = data.data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      duration: item.duration,
      features: item.features.map(subitem => ({
        name: subitem.name,
        description: subitem.description,
      })),
    }))

  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

// покупка подписки
async function buyPlan(planId) {
  if (!userStore.isAuth) {
    router.push({name: 'RegPage'});
    return;
  }

  buyLoading.value = planId;

  try {
    const response = await fetch(`https://smart-lawyer-bot.ru/api/plan/pay/${planId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userStore.token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) throw new Error("Ошибка оплаты");

    const data = await response.json();

    // редирект на полученную ссылку
    if (data.link) {
      window.open(data.link, "_blank");
    } else {
      console.error("Ссылка на оплату не пришла");
    }
  } catch (e) {
    console.error(e);
  } finally {
    buyLoading.value = null;
  }
}

onMounted(() => {
  getPlans();
});
</script>

<template>
  <div v-if="!loading" class="subs-card" v-for="(item, index) in plansData" :key="index">
    <p v-if="isFrozen" class="subs-card__frozen">❄️ Заморожено</p>
    <p class="subs-card__name" v-if="item.name">{{ item.name }}</p>
    <p class="subs-card__price">Цена: <span>{{ item.price }}</span> ₽ /месяц</p>
    <o-collapse
        :open="false"
        expanded
        trigger-class="trigger"
        class="subs-card__accordion"
        animation="fade"
    >
      <template #trigger="{ open }">
            <span class="subs-card__accordion-trigger" :class="open ? 'expanded' : ''">
             Преимущества
              <Icon type="arrow-right"/>
            </span>
      </template>
      <div class="subs-card__accordion-drop">
        <p v-for="(feature, index) in item.features" :key="index">{{ feature.description }}</p>
      </div>
    </o-collapse>
    <div class="subs-card__buttons">
      <Button
          v-if="item.id !== 1"
          :disabled="userStore.currentPlan?.id === item.id"
          class="btn__secondary"
          @click="buyPlan(item.id)"
      >
        {{ userStore.currentPlan?.id === item.id ? "Ваш план активен" : "Купить план" }}
      </Button>
      <Button v-if="userStore.currentPlan?.id === item.id && item.id !== 1 && isFrozen" class="btn__tertiary">
        Разморозить план
      </Button>
      <Button v-if="userStore.currentPlan?.id === item.id && item.id !== 1 && !isFrozen" class="btn__tertiary">
        Заморозить план
      </Button>
    </div>
    <p v-if="userStore.currentPlan?.id === item.id && userStore.currentPlan?.end_date !== null "
       class="subs-card__expired">Подписка заканчивается 11.11.2025</p>
    <transition name="fade">
      <div v-if="buyLoading === item.id" class="subs-card__preloader">
        <Preloader width="50" height="50"/>
      </div>
    </transition>
  </div>
  <Skeleton v-else v-for="n in 4" :key="n"/>
</template>

<style scoped lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.subs-card {
  position: relative;
  width: 100%;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 1.5rem;
  text-align: center;
  background-color: var(--card-color);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid var(--accent-color-1);
  }

  @include breakpoints.media-under-md {
    padding: 1rem;
    grid-gap: 1.25rem;
  }

  &__frozen {
    margin-right: auto;
    font-size: 1rem;
    line-height: 110%;
    color: var(--accent-color-1);
  }

  &__name {
    min-height: 4.375rem;
    font-size: 2rem;
    line-height: 110%;
    font-weight: 600;
    color: var(--text-color-1);

    @include breakpoints.media-under-md {
      min-height: 3.25rem;
      font-size: 1.5rem;
    }
  }

  &__price {
    font-size: 1.25rem;
    line-height: 110%;
    color: var(--text-color-1);

    @include breakpoints.media-under-md {
      font-size: 1rem;
    }

    span {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--accent-color-1);

      @include breakpoints.media-under-md {
        font-size: 1.25rem;
      }
    }
  }

  &__accordion {
    width: 100%;

    &-trigger {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      grid-gap: 1.5rem;
      font-size: 1.25rem;
      line-height: 110%;
      color: var(--text-color-1);
      cursor: pointer;
      transition: all 0.2s ease-in;

      i {
        transition: all 0.2s ease-in;
      }

      &.expanded {
        i {
          transform: rotate(90deg);
        }
      }

      &:hover {
        color: var(--text-color-2);
      }

      @include breakpoints.media-under-md {
        font-size: 1rem;
      }
    }

    &-drop {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      grid-gap: 0.75rem;
      font-size: 1.25rem;
      line-height: 110%;
      text-align: left;
      color: var(--text-color-1);

      @include breakpoints.media-under-md {
        font-size: 1rem;
      }
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;

    > button {
      width: 100%;
    }
  }

  &__expired {
    margin-top: auto;
    font-size: 1rem;
    line-height: 110%;
    color: var(--gray-1);
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