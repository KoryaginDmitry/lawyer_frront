<script setup>
import {computed} from "vue";
import {defineProps, defineEmits} from "vue";

const props = defineProps({
  label: String,
  id: String,
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  btnType: String,
});

const emit = defineEmits(["protected-click"]);

const btnClass = computed(() => {
  let type = "";
  if (props.btnType === "primary") type = "primary";
  else if (props.btnType === "secondary") type = "secondary";
  else if (props.btnType === "tertiary") type = "tertiary";

  return type ? `btn__${type} m` : "";
});

function handleClick() {
  if (!props.isDisabled && !props.isLoading) {
    emit("protected-click");
  }
}
</script>

<template>
  <button
      class="btn"
      :class="[btnClass, { disabled: props.isDisabled, loading: props.isLoading }]"
      :aria-label="props.label"
      @click="handleClick"
      :id="props.id"
  >
    <slot></slot>
    {{ props.label }}
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 0.25rem;
  position: relative;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in;
  border-radius: 8px;

  i {
    font-size: 20px;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &__primary {
    padding: 0.625rem 0.75rem;
    background: var(--accent-color-1);
    color: var(--text-color-1);

    &:hover {
      box-shadow: 4px 4px 0 var(--accent-color-2);
      transform: translate(-4px, -4px);
      color: var(--text-color-2)
    }

    &:focus-visible {
      outline-offset: 1px;
    }

    &:active {
      background: var(--accent-color-3);
    }
  }

  &__secondary {

  }
}
</style>