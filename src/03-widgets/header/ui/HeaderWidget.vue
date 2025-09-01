<script setup>
import {ref} from "vue";
import {Icon} from "@/06-shared/ui";
import {Sidebar} from "@/03-widgets/header/index.js";
import {useUtilityStore} from "@/06-shared/utils/utilityStore.js";

const utilityStore = useUtilityStore();

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
  {
    name: 'Личный кабинет',
    icon: 'profile',
    link: 'ProfilePage',
    ariaLabel: 'Перейти в личный кабинет'
  },
])

const sidebarIsOpen = ref(false);

function toggleSidebar() {
  sidebarIsOpen.value = !sidebarIsOpen.value;
  document.body.style.overflow = sidebarIsOpen.value ? "hidden" : "";
}
</script>

<template>
  <header class="header">
    <div class="header__content container">
      <router-link class="header__logo" :to="{name: 'HomePage'}">
        <img src="@/06-shared/images/logo.png" alt="GPT Lawyer лого"/>
      </router-link>
      <nav v-if="!utilityStore.isWindowTabletMaxSize" class="header__nav">
        <router-link class="header__nav-link"
                     v-for="(item, index) in navList"
                     :key="index"
                     :to="{name: item.link}"
                     :aria-label="item.ariaLabel">
          <Icon :type="item.icon"/>
          <p>{{ item.name }}</p>
        </router-link>
        <span class="header__nav-link">
          <Icon type="exit"/>
          <span>Выход</span>
        </span>
      </nav>
      <button v-if="utilityStore.isWindowTabletMaxSize" aria-label="Открыть/закрыть боковое меню" class="header__burger" :class="{'active' : sidebarIsOpen}"
              @click="toggleSidebar">
        <span></span>
      </button>
    </div>
  </header>
  <Sidebar v-if="utilityStore.isWindowTabletMaxSize" :class="{ active: sidebarIsOpen }"
           :toggle-sidebar="toggleSidebar"/>
</template>

<style lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.header {
  padding: 1rem 0;
  inset: 0;
  background: var(--card-color);
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  position: sticky;
  z-index: var(--base-index);

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
    font-size: 1.125rem;
    line-height: 100%;
    color: var(--text-color-1);
    transition: color 0.2s;
    cursor: pointer;

    &.router-link-exact-active {
      color: var(--accent-color-1);
    }

    .icon {
    }

    &:hover {
      color: var(--accent-color-1);
    }
  }

  &__burger {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      span {
        background: transparent;

        &::before {
          top: 0;
          transform: rotate(45deg);
        }

        &::after {
          bottom: 0;
          transform: rotate(-45deg);
        }
      }
    }

    span {
      position: relative;
      width: 100%;
      height: 0.125rem;
      background: var(--text-color-1);
      transition: .3s ease-in-out;

      &::before {
        position: absolute;
        content: '';
        top: -0.625rem;
        left: 0;
        right: 0;
        width: 100%;
        height: 0.125rem;
        background: var(--text-color-1);
        transition: .3s ease-in-out;
      }

      &::after {
        position: absolute;
        content: '';
        bottom: -0.625rem;
        left: 0;
        right: 0;
        width: 100%;
        height: 0.125rem;
        background: var(--text-color-1);
        transition: .3s ease-in-out;
      }
    }
  }
}
</style>