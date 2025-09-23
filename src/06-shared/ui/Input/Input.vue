<script setup>
import {computed} from "vue";

const props = defineProps({
  field: Object,
  input: Object,
  placeholder: String,
  ariaLabel: String,
})

const emit = defineEmits(["update:modelValue", "input-keyup", "blur"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <o-field class="input-wrapper">
    <o-input
        icon-pack="icon"
        v-model="value"
        v-bind="props.input"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
    />
  </o-field>
</template>

<style lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  grid-gap: 0.125rem;

  .o-field__label {
    color: var(--text-color-1);
    font-size: 0.875rem;
    line-height: 110%;
  }

  .o-input {
    .o-input__input {
      padding: 0.4375rem 0.625rem;
      width: 100%;
      background: var(--bg-color);
      border: 1px solid var(--gray-1);
      border-radius: 4px;
      font-size: 1rem;
      line-height: 110%;
      color: var(--text-color-1);
      outline: none;
      transition: all 0.2s ease-in;

      &:hover {
        border: 1px solid var(--accent-color-1);
      }

      &:focus {
        border: 1px solid var(--accent-color-1);
      }
    }

    textarea {
      min-height: 4.375rem;
      outline: none !important;
      resize: vertical !important;
    }
  }
}
</style>