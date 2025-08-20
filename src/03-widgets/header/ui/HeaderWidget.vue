<script setup>
import {ref} from "vue";
import {Icon} from "@/06-shared/ui";

const navList = ref([
  {
    name: 'Главная',
    icon: 'home',
    link: 'HomePage',
    ariaLabel: 'Перейти на главную страницу'
  },
  {
    name: 'Помощь',
    icon: 'support',
    link: 'HelpPage',
    ariaLabel: 'Перейти на страницу Помощь'
  },
  {
    name: 'Реферальная программа',
    icon: 'user-plus',
    link: '',
    ariaLabel: 'Перейти на страницу Реферальная программа'
  },
  {
    name: 'Подписки',
    icon: 'credit-card',
    link: '',
    ariaLabel: 'Перейти на страницу Подписки'
  },
  {
    name: 'Чат с ботом',
    icon: 'chat',
    link: '',
    ariaLabel: 'Перейти на страницу Чат с ботом'
  },
])
</script>

<template>
  <header class="header">
    <router-link class="header__logo" :to="{name: 'HomePage'}">
      <img src="@/06-shared/images/logo.png" alt="GPT Lawyer logo"/>
    </router-link>
    <nav class="header__nav">
      <router-link class="header__nav-link"
                   v-for="(item, index) in navList"
                   :key="index"
                   :to="{name: item.link}"
                   :aria-label="item.ariaLabel">
        <Icon :type="item.icon"/>
        <p>{{ item.name }}</p>
      </router-link>
    </nav>
  </header>
</template>

<style lang="scss">
.header {
  background: var(--card-color);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 120px;
      height: auto;
    }
  }

  &__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 20px;
  }

  &__nav-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 5px;
    color: var(--text-color);
    transition: color 0.2s;

    &.router-link-exact-active {
      color: var(--accent-color);
    }

    &:hover {
      color: var(--accent-color);
    }
  }
}
</style>