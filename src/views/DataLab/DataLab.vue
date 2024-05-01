<script setup>
import {reactive} from "vue";

const pages = reactive({
  value: {},
});

async function getPages() {
  const data = await fetch(`${import.meta.env.VITE_SERVER}datalab`)
    .then(response => response.json())
    .catch(error => new Error(error));

  if (data instanceof Error) {
    throw new Error();
  }

  return data;
}

getPages().then((data) => {
  pages.value = data;
}).catch((err) => {
  console.log('err: ', err);
})

function availabailityAlert(isAvailable) {
  return !isAvailable ? alert('Unavailable yet') : null;
}
</script>

<template>
  <div class="w-full xl:w-1/2 ml-auto mr-auto">
    <h1 class="text-6xl font-black text-center">Orain's Data Lab</h1>
    <div
      v-for="page in pages.value"
      @click="() => availabailityAlert(page.is_accessible)"
      class="page-wrapper mt-8 relative"
    >
      <p class="absolute left-1/2 top-1/2 unavailable-text font-black italic text-3xl">
        UNAVAILABLE YET
      </p>
      <div
        :class="!page.is_accessible ? 'page_unavailable' : ''"
        class="w-full h-full sm:flex border rounded-xl bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
      >
        <div class="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[10%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
          <img class="size-full absolute top-0 start-0 object-cover" src="https://www.travelandleisure.com/thmb/TaXm_GxnKAscQA4b6kR4KOU0dyo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mayakovskaya-moscow-metro-MOSCOWMETRO0420-5526d5a65f23410daff07c471e8e957a.jpg" alt="Metro">
        </div>
        <div class="flex flex-wrap">
          <div class="p-4 flex flex-col h-full sm:p-7">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">
              {{ page.headline }}
            </h3>
            <p class="mt-1 text-gray-500 dark:text-neutral-400">
              {{ page.description }}
            </p>
            <div class="mt-5">
              <p class="text-xs text-gray-500 dark:text-neutral-500">
                Published in {{ page.publishing_date }} by {{ page.authors[0].name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page_unavailable {
  opacity: 0.3;
}
.unavailable-text {
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: black 0 0 10px;
  z-index: 10;
}
</style>