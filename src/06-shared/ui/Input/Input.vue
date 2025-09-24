<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  field: Object,
  input: Object,
  placeholder: String,
  ariaLabel: String,
  modelValue: [String, Number],
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "blur"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const touched = ref(false);

function onBlur() {
  touched.value = true;
  emit("blur");
}

const hasError = computed(() => touched.value && !!props.error);
</script>

<template>
  <o-field
      class="input-wrapper"
      :class="{ 'input-error': hasError }"
  >
    <o-input
        icon-pack="icon"
        :useHtml5Validation="true"
        v-model="value"
        v-bind="props.input"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        :class="{ 'o-input--error': hasError }"
        @blur="onBlur"
    />
    <transition name="fade">
      <p v-if="touched && error" class="input-error__message">{{ error }}</p>
    </transition>
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

  .input-error__message {
    color: var(--red-1);
    font-size: 0.875rem;
    line-height: 110%;
  }

  &.input-error {
    .o-input {
      .o-input__input {
        border: 1px solid var(--red-1);
        transition: all 0.2s ease-in;

        &:hover {
          border: 1px solid var(--red-2);
        }

        &:focus {
          border: 1px solid var(--red-2);
        }

        &::placeholder {
          color: var(--red-2);
        }
      }
    }
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

      &::placeholder {
        font-size: 1rem;
        line-height: 110%;
        color: var(--gray-1);
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