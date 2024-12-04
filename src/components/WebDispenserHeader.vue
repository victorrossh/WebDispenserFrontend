<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBone,
  faRightToBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";

library.add(faBone, faRightToBracket, faBars);

const isMenuOpen = ref(false);

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const sectionBottom =
      element.getBoundingClientRect().bottom + window.scrollY;
    const scrollPosition = sectionBottom - window.innerHeight;

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <header class="fixed top-0 w-full h-30 bg-bgcolor text-fontcolor shadow-md z-10">
    <nav class="grid grid-cols-2 h-full m-10">
      <div
        class="sm:pl-20 justify-start flex font-bold text-2xl align-middle items-center"
      >
        <font-awesome-icon icon="bone" class="mr-4" />
        <h1 class>BOM GAROTO</h1>
      </div>
      <div class="flex justify-end items-center font-thin">
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-4">
          <font-awesome-icon icon="bars" class="text-2xl" />
        </button>
        <ul class="hidden md:flex space-x-5">
          <li>
            <RouterLink
              class="hover:bg-fontcolor hover:text-black rounded-full p-5 block"
              to="/"
              @click="scrollToSection('home')"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="hover:bg-fontcolor hover:text-black rounded-full p-5 block"
              to="/"
              @click="scrollToSection('about')"
              >Sobre</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="hover:bg-fontcolor hover:text-black rounded-full p-5 block"
              @click="scrollToSection('services')"
              >Serviços</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="hover:bg-fontcolor hover:text-black rounded-full p-5 block"
              to="/"
              @click="scrollToSection('contact')"
              >Contato</RouterLink
            >
          </li>
          <li class="flex">
            <RouterLink
              class="hover:bg-fontcolor bg-purple-500 hover:text-black rounded-full p-5"
              to="/login"
            >
              <font-awesome-icon icon="right-to-bracket" />
              Login</RouterLink
            >
          </li>
        </ul>
        <div
          v-if="isMenuOpen"
          class="absolute top-20 right-0 bg-bgcolor shadow-md rounded-md w-full text-fontcolor"
        >
          <ul class="flex flex-col space-y-4 p-5 text-center">
            <li>
              <RouterLink
                class="hover:bg-fontcolor hover:text-black rounded-md p-3 block"
                to="/"
                @click="scrollToSection('home')"
                >Home</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/"
                @click="scrollToSection('about')"
                class="hover:bg-fontcolor hover:text-black rounded-md p-3 block"
                >Sobre</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/"
                @click="scrollToSection('services')"
                class="hover:bg-fontcolor hover:text-black rounded-md p-3 block"
                >Serviços</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/"
                @click="scrollToSection('contact')"
                class="hover:bg-fontcolor hover:text-black rounded-md p-3 block"
                >Contato</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/login"
                class="hover:bg-fontcolor bg-purple-500 hover:text-black rounded-md p-3 block"
              >
                <font-awesome-icon icon="right-to-bracket" />
                Login
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
