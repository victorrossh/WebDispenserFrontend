<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="postcss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

section {
  @apply px-10 py-10 w-full justify-items-center;
}

h1 {
  @apply font-bold text-2xl;
}

h2 {
  @apply font-bold text-xl;
}

.article {
  @apply w-2/3 mx-auto
}

html {
  scroll-behavior: smooth;
}
</style>
