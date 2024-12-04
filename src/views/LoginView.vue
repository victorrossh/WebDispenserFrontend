<script setup lang="ts">
import { onMounted, ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faLock,
  faUser,
  faRightToBracket,
  faBars,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { login, register } from "@/router/auth";
import { useRouter } from "vue-router";

const router = useRouter();

library.add(faLock, faUser, faRightToBracket, faBars, faEye, faEyeSlash);

const name = ref<string>("");
const email = ref<string>("");
const forget = ref<string>("");
const password = ref<string>("");
const showPassword = ref<boolean>(false);
const isModalOpen = ref<boolean>(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

const isSignUpModalOpen = ref<boolean>(false);

function openSignUpModal() {
  isSignUpModalOpen.value = true;
}

function closeSignUpModal() {
  isSignUpModalOpen.value = false;
}

function signUp(name: string, email: string, password: string) {
  register(name, email, password);
  closeSignUpModal();
}

async function handleLogin(email:string, password:string) {
  const success = await login(email, password);
  if (success) {
    router.push("/dashboard");
  }
}

function sendEmail(email: string) {
  alert("Email enviado para " + email);
}

onMounted(() => {
  const token = localStorage.getItem("authToken");
  
  if (token) {
    router.push("/dashboard");
  }
})
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-900 mt-20 text-white font-sans"
  >
    <div
      class="flex flex-col lg:flex-row bg-gray-800 rounded-3xl w-3/4 shadow-lg overflow-hidden max-w-4xl"
    >
      <div
        class="flex flex-col items-center lg:w-1/2 my-auto p-8 text-center space-y-6"
      >
        <font-awesome-icon icon="user" class="text-4xl mb-4" />

        <h1 class="text-2xl font-semibold">Entrar</h1>

        <div class="relative w-3/4 lg:w-2/3">
          <font-awesome-icon
            icon="user"
            class="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Digite seu ID"
            v-model="email"
            class="w-full pl-10 p-2 bg-gray-700 rounded-lg outline-none text-white"
          />
        </div>

        <div class="relative w-3/4 lg:w-2/3">
          <font-awesome-icon
            icon="lock"
            class="absolute left-3 top-3 text-gray-400"
          />
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Senha"
            v-model="password"
            class="w-full pl-10 pr-10 p-2 bg-gray-700 rounded-lg outline-none text-white"
          />
          <span
            @click="togglePassword"
            class="absolute right-3 top-3 cursor-pointer text-gray-400"
          >
            <font-awesome-icon
              :icon="['fas', showPassword ? 'eye-slash' : 'eye']"
            />
          </span>
        </div>

        <div class="flex justify-between items-center w-3/4 lg:w-2/3 text-sm">
          <button @click="openModal" class="text-purple-400 underline">
            Esqueceu sua senha?
          </button>
        </div>

        <button
          @click="handleLogin(email, password)"
          class="flex items-center justify-center bg-purple-500 hover:bg-purple-600 transition rounded-lg p-2 w-3/4 lg:w-2/3 text-lg space-x-2"
        >
          <font-awesome-icon icon="right-to-bracket" />
          <span>Entrar</span>
        </button>
        <button @click="openSignUpModal" class="text-purple-400 underline mt-2">
          Não tem uma conta? Cadastre-se
        </button>
      </div>

      <div
        class="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-700"
      >
        <img
          src="../assets/images/dog_login.png"
          alt="Dog Image"
          class="max-w-full max-h-full object-cover rounded-tr-3xl rounded-br-3xl"
        />
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    >
      <div
        class="bg-gray-800 rounded-xl p-6 w-11/12 max-w-lg shadow-lg text-center text-white"
      >
        <button
          @click="closeModal"
          class="ml-auto flex text-2xl text-gray-400 hover:text-white hover:cursor-pointer"
        >
          &times;
        </button>
        <h2 class="text-xl mb-4">Esqueceu Seu ID?</h2>
        <p class="mb-4">Não se preocupe, cuidaremos disso!</p>
        <input
          type="email"
          placeholder="Email"
          v-model="forget"
          class="w-10/12 p-2 mb-4 bg-gray-700 rounded-lg outline-none text-white"
        />
        <button
          @click="sendEmail(email)"
          class="bg-purple-500 hover:bg-purple-600 transition w-1/2 p-2 rounded-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="isSignUpModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
  >
    <div
      class="bg-gray-800 rounded-xl p-6 w-11/12 max-w-lg shadow-lg text-center text-white"
    >
      <button
        @click="closeSignUpModal"
        class="flex ml-auto top-2 right-2 text-2xl text-gray-400 hover:text-white"
      >
        &times;
      </button>
      <h2 class="text-xl mb-4">Cadastre-se</h2>
      <input
        type="text"
        placeholder="Nome de Usuário"
        v-model="name"
        class="w-10/12 p-2 mb-4 bg-gray-700 rounded-lg outline-none text-white"
      />
      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="w-10/12 p-2 mb-4 bg-gray-700 rounded-lg outline-none text-white"
      />
      <input
        type="password"
        placeholder="Senha"
        v-model="password"
        class="w-10/12 p-2 mb-4 bg-gray-700 rounded-lg outline-none text-white"
      />
      <button
        @click="signUp(name, email, password)"
        class="bg-purple-500 hover:bg-purple-600 transition w-1/2 p-2 rounded-lg"
      >
        Cadastrar
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.login {
  @apply overflow-y-hidden mt-20 max-w-10;
}
</style>
