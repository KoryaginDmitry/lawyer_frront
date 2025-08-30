<script setup>
import {Icon} from "@/06-shared/ui/index.js";
import {ref} from "vue";

const props = defineProps(["toggleSidebar"])

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
    link: 'ReferralPage',
    ariaLabel: 'Перейти на страницу Реферальная программа'
  },
  {
    name: 'Подписки',
    icon: 'credit-card',
    link: 'SubsPage',
    ariaLabel: 'Перейти на страницу Подписки'
  },
  {
    name: 'Чат с ботом',
    icon: 'chat',
    link: 'ChatPage',
    ariaLabel: 'Перейти на страницу Чат с ботом'
  },
])
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__content">
      <nav class="sidebar__list">
        <router-link :to="{name: item.link}"
                     class="sidebar__item" v-for="(item, index) in navList"
                     :key="index"
                     :aria-label="item.ariaLabel"
                     @click="toggleSidebar"
        >
          <Icon :type="item.icon"/>
          <p>{{ item.name }}</p>
        </router-link>
        <span class="sidebar__item">
          <Icon type="exit"/>
          <span>Выход</span>
        </span>
      </nav>
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar {
  padding: 0.75rem;
  position: fixed;
  inset: 0;
  top: 64px;
  width: 100%;
  background: var(--card-color);
  transform: translateX(100%);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  &.active {
    transform: translateX(0);
  }

  &__content {
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 1.25rem;
  }

  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 0.375rem;

    color: var(--text-color);
    transition: color 0.2s;

    &.router-link-exact-active {
      color: var(--accent-color);
    }

    p,span {
      font-size: 1.25rem;
      line-height: 1.375rem;
    }

    .icon {
      font-size: 1rem;
    }

    &:hover {
      color: var(--accent-color);
    }
  }
}
</style>