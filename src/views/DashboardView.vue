<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAdd,
  faRightFromBracket,
  faDeleteLeft,
  faEye,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { onMounted, ref } from "vue";
import apiClient from "@/services/axios";
import { useRouter } from "vue-router";
import showToast from "@/components/showToast";
import { logout } from "@/router/auth";

const router = useRouter();

library.add(faPlay, faAdd, faRightFromBracket, faDeleteLeft, faEye);

type Device = {
  id: string;
  name: string;
  token: string;
};

type Schedule = {
  id: string;
  time: string;
  deviceId: string;
  info: string;
};

const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

const time = ref<string>("00:00:00");
const isValidTime = ref<boolean>(true);

const deviceName = ref<string>("");

function handleInput(event: Event) {
  const input = (event.target as HTMLInputElement).value;

  time.value = input
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1:$2")
    .replace(/:(\d{2})(\d)/, ":$1:$2")
    .slice(0, 8);

  isValidTime.value = timeRegex.test(time.value);
}

const isModalOpen = ref(false);

function openModal(selectedDevice: Device) {
  isModalOpen.value = true;
  device.value = selectedDevice;
}

function closeModal() {
  isModalOpen.value = false;
  device.value = null;
}
const isDeviceModalOpen = ref(false);

function openDeviceModal(selectedDevice: Device) {
  isDeviceModalOpen.value = true;
  device.value = selectedDevice;
  fetchSchedule(selectedDevice);
}

function closeDeviceModal() {
  isDeviceModalOpen.value = false;
}

const isFastModalOpen = ref(false);
function openFastModal(selectedDevice: Device) {
  isFastModalOpen.value = true;
  device.value = selectedDevice;
}
function closeFastModal() {
  isFastModalOpen.value = false;
}

const devices = ref<Array<Device>>([]);
const device = ref<Device | null>(null);

const schedules = ref<Array<Schedule>>([]);

const info = ref<string>("");

async function handleLogout() {
  const userToken = localStorage.getItem("authToken");
  const success = await logout(userToken!);
  if (success) {
    router.push("/");
  }
}

function clearForm() {
  deviceName.value = "";
  time.value = "00:00:00";
  info.value = "";
}

async function addDevice(deviceName: string) {
  const userToken = localStorage.getItem("authToken");

  if (deviceName.length >= 4) {
    await apiClient
      .post(`/api/device`, { name: deviceName, token: userToken })
      .then((response) => {
        if (response.data["status"] !== "error") {
          showToast(response.data["message"], "success");
          clearForm();
          fetchDevices();
        } else {
          showToast(response.data["message"]);
        }
      });
  } else {
    showToast("Adcione um nome ao dispositivo! (Mínimo de 4 dígitos)");
  }
}

async function fastAction(device: Device, info: string) {
  const userToken = localStorage.getItem("authToken");
  await apiClient
    .post(`/api/command`, {
      token: userToken,
      deviceId: device.id,
      command: "feed",
      info: info,
    })
    .then(async (response) => {
      if (response.data["status"] !== "error") {
        showToast(response.data["message"], "success");
        clearForm();
        closeFastModal();
        await fetchDevices();
      } else {
        showToast(response.data["message"]);
      }
    });
}

async function deleteDevice(device: Device) {
  const userToken = localStorage.getItem("authToken");

  await apiClient
    .delete(`/api/device`, {
      data: {
        token: userToken,
        deviceId: device.id,
      },
    })
    .then(async (response) => {
      if (response.data["status"] !== "error") {
        showToast(response.data["message"], "success");
        await fetchDevices();
      } else {
        showToast(response.data["message"]);
      }
    });
}

async function addSchedule(deviceId: string, time: string, info?: string) {
  const userToken = localStorage.getItem("authToken");
  await apiClient
    .post(`/api/schedule`, {
      token: userToken,
      deviceId: deviceId,
      command: "feed",
      time: time,
      info: info || null,
    })
    .then(async (response) => {
      if (response.data["status"] !== "error") {
        showToast(response.data["message"], "success");
        clearForm();
        closeModal();
        await fetchDevices();
      } else {
        showToast(response.data["message"]);
      }
    });
}

async function deleteSchedule(schedule: Schedule) {
  const userToken = localStorage.getItem("authToken");
  console.log(schedule);

  await apiClient
    .delete(`/api/schedule`, {
      data: {
        token: userToken,
        deviceId: schedule.deviceId,
        scheduleId: schedule.id,
      },
    })
    .then(async (response) => {
      if (response.data["status"] !== "error") {
        showToast(response.data["message"], "success");
        closeDeviceModal();
        await fetchDevices();
      } else {
        showToast(response.data["message"]);
      }
    });
}

async function fetchDevices() {
  const userToken = localStorage.getItem("authToken");

  await apiClient
    .get(`/api/user?token=${userToken}`)
    .then((response) => {
      if (response.data["status"] !== "error") {
        devices.value = response.data["devices"];
      } else {
        devices.value = [];
        showToast(response.data["message"]);
      }
    })
    .catch(() => {
      showToast("Erro ao buscar dispositivos.");
    });
}

function fetchSchedule(selectedDevice: Device) {
  apiClient
    .get(`/api/device?token=${selectedDevice.token}`)
    .then(async (response) => {
      if (response.data["status"] !== "error") {
        schedules.value = response.data["schedule"];
        await fetchDevices();
      } else {
        showToast(response.data["message"]);
      }
    })
    .catch(() => {
      showToast("Erro ao buscar agendamento.");
    });
}

onMounted(() => {
  fetchDevices();
});
</script>

<template>
  <div class="flex h-screen bg-gray-100 dashboard">
    <aside class="w-64 bg-bgcolor text-fontcolor hidden md:flex flex-col aside">
      <div class="p-6 text-2xl font-bold">Dashboard</div>
      <span readonly class="bg-gray-500 text-fontcolor p-5 m-6 rounded-full"
        >Dispositivos</span
      >
      <button
        @click="handleLogout"
        class="text-lg mb-4 mt-auto ml-auto mr-4 justify-end"
      >
        <span
          >Logout
          <font-awesome-icon class="ml-2" icon="right-from-bracket" />
        </span>
      </button>
    </aside>

    <main
      class="flex flex-col flex-shrink-1 h-screen md:p-6 md:w-2/3 bg-gray-100"
    >
      <section class="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2">
        <div
          class="bg-white p-6 rounded-lg shadow-md md:w-4/5 justify-self-start w-full"
        >
          <h2 class="text-xl font-bold mb-2">Total de Dispositivos</h2>
          <p class="text-lg">
            {{ devices.length }}
          </p>
        </div>
        <div
          class="bg-bgcolor text-fontcolor md:w-4/5 md:justify-self-end p-6 rounded-lg shadow-md w-full justify-self-start"
        >
          <h2 class="text-xl font-bold mb-4">Adicionar Dispositivos</h2>
          <div>
            <div class="mt-2 w-full flex">
              <input
                class="p-3 w-full mr-4 bg-fontcolor rounded-lg outline-none text-purple-500"
                type="text"
                placeholder="Nome"
                minlength="4"
                v-model="deviceName"
              />
              <button
                :disabled="deviceName.length < 4"
                class="border border-gray-500 rounded-lg p-3 bg-purple-500 hover:bg-gray-300 disabled:opacity-50"
                @click="addDevice(deviceName)"
              >
                <font-awesome-icon icon="plus" />
              </button>
            </div>
            <div>
              <p
                v-if="deviceName.length > 0 && deviceName.length < 4"
                class="text-red-500 mt-2"
              >
                Mínimo de 4 dígitos
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="bg-white p-6 rounded-lg w-full shadow-md">
          <h2 class="text-xl font-bold mb-4">Dispositivos</h2>
          <table
            class="hidden md:table min-w-full table-fixed text-center rounded-2xl overflow-hidden"
          >
            <thead>
              <tr class="bg-gray-100">
                <th class="px-6 py-3 font-semibold">Nome</th>
                <th class="px-6 py-3 font-semibold">Ação Rápida</th>
                <th class="px-6 py-3 font-semibold">Visualizar</th>
                <th class="px-6 py-3 font-semibold">Programar</th>
                <th class="px-6 py-3 font-semibold">Excluir</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="device in devices"
                :key="device.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-nowrap">{{ device.name }}</td>
                <td>
                  <button @click="openFastModal(device)">
                    <font-awesome-icon icon="play" />
                  </button>
                </td>
                <td>
                  <button @click="openDeviceModal(device)">
                    <font-awesome-icon icon="eye" />
                  </button>
                </td>
                <td>
                  <button @click="openModal(device)">
                    <font-awesome-icon icon="add" />
                  </button>
                </td>
                <td>
                  <button @click="deleteDevice(device)">
                    <font-awesome-icon icon="delete-left" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="md:hidden w-full space-y-4">
            <div
              v-for="device in devices"
              :key="device.id"
              class="border rounded-lg p-4 bg-gray-100 shadow"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ID:</span>
                <span>{{ device.id }}</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">Nome:</span>
                <span>{{ device.name }}</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">Ação Rápida:</span>
                <button @click="openFastModal(device)">
                  <font-awesome-icon icon="play" />
                </button>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">Visualizar:</span>
                <button @click="openDeviceModal(device)">
                  <font-awesome-icon icon="eye" />
                </button>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">Programar:</span>
                <button @click="openModal(device)">
                  <font-awesome-icon icon="add" />
                </button>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-semibold">Excluir:</span>
                <button @click="deleteDevice(device)">
                  <font-awesome-icon icon="delete-left" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="md:hidden mt-10 flex">
          <button
            @click="handleLogout"
            class="align-bottom text-lg mb-4 mt-auto mr-4 justify-end"
          >
            <span
              >Logout
              <font-awesome-icon class="ml-2" icon="right-from-bracket" />
            </span>
          </button>
        </div>
      </section>
    </main>
  </div>

  <div
    v-if="isFastModalOpen && device"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
  >
    <div
      class="bg-gray-800 rounded-xl p-6 w-11/12 max-w-lg shadow-lg flex flex-col text-center text-white"
    >
      <div class="flex justify-around items-center">
        <span class="opacity-50"> Device Token: {{ device?.token }} </span>
        <span
          @click.stop="closeFastModal"
          class="text-2xl text-gray-400 hover:text-white hover:cursor-pointer"
        >
          &times;
        </span>
      </div>
      <select
        placeholder="Quantidade"
        v-model="info"
        class="w-3/4 mx-auto p-2 my-4 bg-gray-700 rounded-lg outline-none text-white"
      >
        <option value="" disabled selected>Selecione um valor</option>
        <option value="100">100g</option>
        <option value="150">150g</option>
        <option value="200">200g</option>
      </select>
      <button
        type="submit"
        :disabled="!info"
        @click="fastAction(device, info)"
        class="bg-purple-500 transition w-1/2 p-2 rounded-lg mx-auto"
      >
        Despejar
      </button>
    </div>
  </div>

  <div
    v-if="isModalOpen && device"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
  >
    <div
      class="bg-gray-800 rounded-xl p-6 w-11/12 max-w-lg shadow-lg flex flex-col text-center text-white"
    >
      <div class="flex justify-around items-center">
        <span class="opacity-50"> Device Token: {{ device?.token }} </span>
        <span
          @click.stop="closeModal"
          class="text-2xl text-gray-400 hover:text-white hover:cursor-pointer"
        >
          &times;
        </span>
      </div>
      <h2 class="text-xl mb-4">Adicionar Agendamento</h2>
      <input
        placeholder="Horário"
        v-model="time"
        maxlength="8"
        @input="handleInput"
        class="w-3/4 mx-auto p-2 bg-gray-700 rounded-lg outline-none text-white"
      />
      <p v-if="!isValidTime" class="text-red-500">
        Formato de horário inválido. Use HH:MM:SS
      </p>
      <select
        placeholder="Quantidade"
        v-model="info"
        class="w-3/4 mx-auto p-2 my-4 bg-gray-700 rounded-lg outline-none text-white"
      >
        <option value="" disabled selected>Selecione um valor</option>
        <option value="100">100g</option>
        <option value="150">150g</option>
        <option value="200">200g</option>
      </select>
      <button
        type="submit"
        :disabled="!isValidTime"
        @click="addSchedule(device.id, time, info)"
        class="bg-purple-500 transition w-1/2 p-2 rounded-lg mx-auto"
      >
        Adicionar
      </button>
    </div>
  </div>

  <div
    v-if="isDeviceModalOpen && schedules"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
  >
    <div
      class="bg-gray-800 rounded-xl p-6 w-11/12 max-w-lg shadow-lg text-center text-white"
    >
      <div class="flex justify-around items-center">
        <span class="opacity-50"> Device Token: {{ device?.token }} </span>
        <span
          @click.stop="closeDeviceModal"
          class="text-2xl text-gray-400 hover:text-white hover:cursor-pointer"
        >
          &times;
        </span>
      </div>
      <table
        class="min-w-full table-fixed text-center mt-4 rounded-xl overflow-hidden"
      >
        <thead>
          <tr class="bg-purple-500">
            <th class="px-6 py-3 font-semibold">Horário</th>
            <th class="px-6 py-3 font-semibold">Quantidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="schedule in schedules" :key="schedule.id">
            <td class="px-6 py-4">{{ schedule.time }}</td>
            <td class="px-6 py-4">{{ schedule.info }}g</td>
            <td class="px-6 py-4">
              <button @click="deleteSchedule(schedule)">
                <font-awesome-icon icon="delete-left" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.dashboard {
  @apply text-bgcolor;
}
</style>
