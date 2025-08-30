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
      <button v-if="utilityStore.isWindowTabletMaxSize" class="header__burger" :class="{'active' : sidebarIsOpen}"
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
  background: var(--card-color);

  @include breakpoints.media-above-1921 {
    padding: 1.25rem 0;
  }

  @include breakpoints.media-above-2560 {
    padding: 1.75rem 0;
  }

  @include breakpoints.media-above-3840 {
    padding: 2.5rem 0;
  }

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

      @include breakpoints.media-above-1921 {
        width: 7rem;
      }

      @include breakpoints.media-above-2560 {
        width: 10rem;
      }

      @include breakpoints.media-above-3840 {
        width: 13rem;
      }
    }
  }

  &__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 1.25rem;

    @include breakpoints.media-above-1921 {
      grid-gap: 1.5rem;
    }

    @include breakpoints.media-above-2560 {
      grid-gap: 2rem;
    }
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

    .icon {
    }

    &:hover {
      color: var(--accent-color);
    }

    @include breakpoints.media-above-1921 {
      grid-gap: 0.5rem;
    }

    @include breakpoints.media-above-2560 {
      grid-gap: 0.75rem;
    }

    @include breakpoints.media-above-3840 {
      grid-gap: 1rem;
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
      background: var(--text-color);
      transition: .3s ease-in-out;

      &::before {
        position: absolute;
        content: '';
        top: -0.625rem;
        left: 0;
        right: 0;
        width: 100%;
        height: 0.125rem;
        background: var(--text-color);
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
        background: var(--text-color);
        transition: .3s ease-in-out;
      }
    }
  }
}
</style>