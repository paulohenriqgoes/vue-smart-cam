<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  score: Number,
  width: Number,
  height: Number,
  top: Number,
  left: Number,
})

const computedScore = computed(() => {
  return props.score ? `${Math.round(props.score * 100)}%` : ''
})
</script>

<template>
  <div class="box-wrapper"
    :style="{
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    }">
    <p class="box-wrapper-label">{{ label }} with {{ computedScore }} confidence.</p>
  </div>
</template>

<style scoped>
  .box-wrapper {
    position: absolute;
    border: 1px dashed white;
    background-color: rgba(125, 253, 6, 0.2);
    z-index: 1;
  }

  .box-wrapper-label {
    position: absolute;
    display: flex;
    width: calc(100% - 30px);
    height: auto;
    padding: 15px;
    font-size: 14px;
    color: white;
    border-bottom: 1px dashed white;
    background-color: rgba(255, 166, 0, 0.5);
    z-index: 2;
    top: -15px;
    left: 0;
  }
</style>