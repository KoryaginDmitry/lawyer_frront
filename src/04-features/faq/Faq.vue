<script setup>
import {ref, onMounted, computed} from "vue";
import requestConfig from "@/04-features/faq/requestConfig.js";
import {Icon} from "@/06-shared/ui/index.js";

const faqList = ref([]);
const selectedGroupId = ref(null); // выбранная группа

async function getFaq() {
  try {
    const response = await fetch(requestConfig.GETHelp.url);
    if (!response.ok) throw new Error(response.status);

    const data = await response.json();
    faqList.value = data.data.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      information: group.information.map((info) => ({
        name: info.name,
        description: info.description,
      })),
    }));

    // по умолчанию выбираем первую группу
    if (faqList.value.length) selectedGroupId.value = faqList.value[0].id;
  } catch (e) {
    console.error(e);
  }
}

onMounted(getFaq);

// функция для выбора группы
function selectGroup(id) {
  selectedGroupId.value = id;
}

// вычисляемая группа для отображения в main
const selectedGroup = computed(() =>
    faqList.value.find((g) => g.id === selectedGroupId.value)
);
</script>

<template>
  <div class="faq">
    <ul class="faq__side">
      <li
          v-for="group in faqList"
          :key="group.id"
          :class="{ active: group.id === selectedGroupId }"
          @click="selectGroup(group.id)"
      >
        {{ group.name }}
      </li>
    </ul>

    <div class="faq__main" v-if="selectedGroup">
      <div class="faq__main-desc">{{ selectedGroup.description }}</div>
      <o-collapse
          :open="false"
          expanded
          trigger-class="trigger"
          v-for="item in selectedGroup.information"
          :key="item.name"
      >
        <template #trigger="{ open }">
          <span :class="open ? 'expanded' : ''">
            {{ item.name }}
            <Icon type="arrow-right"/>
          </span>
        </template>
        <div class="notification">
          <p>{{ item.description }}</p>
        </div>
      </o-collapse>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/06-shared/assets/breakpoints.scss";

.faq {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;

  @include breakpoints.media-under-md {
    flex-direction: column;
  }

  &__side {
    width: 15rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 1rem;
    background-color: var(--card-color);
    border-radius: 16px;

    @include breakpoints.media-under-md {
      padding: 1rem;
      width: auto;
      flex-direction: row;
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    @include breakpoints.media-under-sm {
      grid-gap: 0.5rem;
    }

    li {
      padding: 0.3125rem 0.625rem;
      font-size: 1.5rem;
      line-height: 110%;
      color: var(--text-color-1);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease-in;

      &.active {
        background-color: var(--gray-1);
      }

      &:hover {
        background-color: var(--gray-1);
      }
    }
  }

  &__main {
    flex-grow: 1;
    padding: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.1;
    color: var(--text-color-1);
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
    background-color: var(--card-color);
    border-radius: 16px;

    @include breakpoints.media-under-md {
      padding: 1rem;
    }

    &-desc {
      font-size: 1.25rem;
      line-height: 110%;
      color: var(--text-color-1);
    }
  }

  .o-collapse {
    background-color: var(--gray-2);
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: var(--gray-1);

      .o-collapse__trigger {
        span {
          color: var(--accent-color-1);
        }
      }
    }

    &__trigger {
      padding: 0.625rem;
      cursor: pointer;

      span {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 1.25rem;
        line-height: 110%;
        color: var(--text-color-1);
        transition: all 0.2s ease-in;

        &.expanded {
          color: var(--accent-color-1);

          .icon {
            transform: rotate(90deg);
          }
        }

        .icon {
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      }
    }

    &__content {
      padding: 0.625rem;
      font-size: 1.25rem;
      line-height: 110%;
      color: var(--text-color-1);
    }
  }
}
</style>