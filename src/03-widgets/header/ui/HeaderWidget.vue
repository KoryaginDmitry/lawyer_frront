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
    <div class="header__content container">
      <router-link class="header__logo" :to="{name: 'HomePage'}">
        <img src="@/06-shared/images/logo.png" alt="GPT Lawyer лого"/>
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
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 1rem 0;
  background: var(--card-color);

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 5.5rem;
      height: auto;
    }
  }

  &__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 1.25rem;
  }

  &__nav-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 0.375rem;
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