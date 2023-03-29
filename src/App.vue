<script setup lang="ts">
import SmartCam from './components/SmartCam/SmartCam.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://www.tensorflow.org/js" target="_blank">
      <img src="./assets/tensorflow.svg" class="logo tensor-flow" alt="TensorFlow logo" />
    </a>
  </div>

  <smart-cam />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.tensor-flow:hover {
  filter: drop-shadow(0 0 2em #ed8e24aa);
}
</style>
