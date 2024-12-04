<script setup lang="ts">
import { RouterView } from "vue-router";
import WebDispenserHeader from "../WebDispenserHeader.vue";
import WebDispenserFooter from "../WebDispenserFooter.vue";
</script>

<template>
  <WebDispenserHeader />
  <RouterView />
  <WebDispenserFooter />
</template>

<style lang="postcss">
.about {
  @apply md:min-h-screen md:flex md:align-middle;
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
  @apply md:w-2/3 md:mx-auto w-full;
}

html {
  scroll-behavior: smooth;
}
</style>
