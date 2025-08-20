<template>
  <i class="icon" :class="['fontIcon-' + type]"></i>
</template>

<script setup>

defineProps({
  type: {
    type: String,
    required: true,
  },
  up: {
    type: Boolean,
    default: false,
  },
  down: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.icon {
}
</style>