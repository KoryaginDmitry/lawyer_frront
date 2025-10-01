<script setup>
const props = defineProps({
  width: String,
  height: String,
})
</script>

<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 100 100">
    <g transform="rotate(0 50 50)">
      <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#a3b1c9"
          stroke-width="5"
          fill="none"
          stroke-dasharray="283"
          stroke-linecap="round"
      >
        <animate
            id="shrink"
            attributeName="stroke-dashoffset"
            from="0"
            to="283"
            dur="2s"
            begin="0s; grow.end"
            fill="freeze"
        />
        <animate
            id="grow"
            attributeName="stroke-dashoffset"
            from="283"
            to="566"
            dur="2s"
            begin="shrink.end"
            fill="freeze"
        />
      </circle>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>