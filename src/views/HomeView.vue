<template>
  <div class="flex flex-col items-center">
    <section id="home" class="py-40">
      <div
        class="wrapper flex flex-col lg:flex-row items-center justify-center gap-8"
      >
        <div class="pet-title text-center lg:text-left">
          <h1 class="text-8xl font-bold leading-none">Bom<br />Garoto</h1>
          <h3 class="text-2xl my-4">Automação para o seu pet</h3>
          <a
            class="bg-purple-500 text-fontcolor py-2 px-6 rounded hover:bg-white hover:text-bgcolor font-bold"
            href="#about"
          >
            SAIBA MAIS
          </a>
        </div>
          <img
            src="../assets/images/dog-black-white-background.webp"
            class="rounded-full"
          />
      </div>
    </section>
    <section class="bg-gray-100 py-40 -mt-20" id="about">
      <div
        class="flex flex-col lg:flex-row items-center justify-center gap-8"
      >
          <img
            src="../assets/images/drdog.webp"
            alt="Imagem do cachorro"
            class="rounded-full"
          />
        <div class="text-center lg:text-left space-y-4">
          <h1 class="text-4xl font-bold">Sobre Bom Garoto</h1>
          <p>
            O Bom Garoto é um sistema inovador de dispenser automático de petz
            que pode ser controlado remotamente.
          </p>
          <div class="mt-4">
            <RouterLink
              class="bg-purple-500 text-fontcolor py-2 px-6 rounded hover:bg-white hover:text-bgcolor font-bold"
              to="/about"
              >Leia Mais</RouterLink
            >
          </div>
        </div>
      </div>
    </section>

    <section id="services">
      <div class="wrapper text-center">
        <h1 class="text-4xl font-bold mb-8">Serviços</h1>
        <div class="pet-cards flex flex-wrap justify-center gap-8">
          <div class="card text-center bg-gray-200 p-6 rounded shadow-md w-64">
            <img
              src="../assets/images/service1.webp"
              alt=""
              class="card-img rounded-full mb-4"
            />
            <h2 class="card-head text-xl font-semibold">Automação</h2>
            <p class="card-pera">Automação alimentícia para o pet.</p>
          </div>
          <div class="card text-center bg-gray-200 p-6 rounded shadow-md w-64">
            <img
              src="../assets/images/service2.webp"
              alt=""
              class="card-img rounded-full mb-4"
            />
            <h2 class="card-head text-xl font-semibold">Automação</h2>
            <p class="card-pera">Automação alimentícia para o pet.</p>
          </div>
          <div class="card text-center bg-gray-200 p-6 rounded shadow-md w-64">
            <img
              src="../assets/images/service3.webp"
              alt=""
              class="card-img rounded-full mb-4"
            />
            <h2 class="card-head text-xl font-semibold">Automação</h2>
            <p class="card-pera">Automação alimentícia para o pet.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-8">Amor pelo Cliente</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-2/3 mx-auto">
          <img
            src="../assets/images/dog.jpg"
            class="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="../assets/images/cat2.jpg"
            class="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="../assets/images/dog3.jpg"
            class="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="../assets/images/cat4.jpg"
            class="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="../assets/images/dog5.jpg"
            class="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="../assets/images/cat6.jpg"
            class="w-full h-80 object-cover rounded-lg"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="wrapper text-center">
        <h1 class="text-4xl font-bold mb-8">O que os donos dizem</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 article ">
          <div class="bg-gray-200 p-6 rounded shadow-md">
            <h2 class="text-xl font-semibold">"Amor ao Trabalho"</h2>
            <p class="text-sm mt-4">
              Com o dispenser automático, minha rotina com meu pet ficou muito
              mais tranquila.
            </p>
            <h4 class="mt-8 font-bold">— Amanda Lopes</h4>
          </div>
          <div class="bg-gray-200 p-6 rounded shadow-md">
            <h2 class="text-xl font-semibold">"Ótimo Serviço"</h2>
            <p class="text-sm mt-4">
              O sistema de dispenser automático salvou meu dia a dia corrido. É
              incrível como algo simples pode trazer tanto conforto. Agora não
              me preocupo mais com as necessidades do meu pet enquanto trabalho.
            </p>
            <h4 class="mt-8 font-bold">— João Pereira</h4>
          </div>
          <div class="bg-gray-200 p-6 rounded shadow-md">
            <h2 class="text-xl font-semibold">"Praticidade"</h2>
            <p class="text-sm mt-4">
              O dispenser automático é simplesmente incrível! Consigo programar
              a troca dos pads pelo site enquanto estou no trabalho, o que me
              traz muita tranquilidade. Além disso, o sistema é super fácil de
              usar, mesmo para quem não é tão familiarizado com tecnologia
            </p>
            <h4 class="mt-8 font-bold">— Carla Mendes</h4>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100" id="contact">
      <div class="text-center space-y-8 article">
        <h1 class="text-4xl font-bold">Contato</h1>
        <div class="grid grid-cols-1 md:grid-cols-4 text-sm">
          <div>
            <h2>Telefone</h2>
            <p>(11) 94841-6204</p>
          </div>
          <div>
            <h2>Email</h2>
            <p>victor.ross098@gmail.com</p>
          </div>
          <div>
            <h2>Horários</h2>
            <p>Seg - Sex: 9:00 - 20:00</p>
            <p>Sábados: 9:00 - 16:00</p>
          </div>
          <div>
            <h2>Área de Serviço</h2>
            <p>São Paulo</p>
          </div>
        </div>
        <div class="space-x-2 md:mx-8">
          <form class="grid grid-cols-2 grid-rows-3">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              class="p-2 border-b-2 m-4 border-gray-400 focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              class="p-2 border-b-2 m-4 border-gray-400 focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Como podemos ajudar?"
              class="m-4 p-2 border-b-2 border-gray-400 col-span-2"
            ></textarea>
            <button
              class="mx-4 mt-10 px-4 bg-purple-500 text-fontcolor p-2 rounded-full col-span-2"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.article {
  @apply w-full
}


</style>