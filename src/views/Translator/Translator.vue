<script setup>
import {computed, nextTick, onMounted, reactive, ref, watch, watchEffect} from 'vue';
import TranslatorMeta from "@/components/Translator/TranslatorMeta.vue";
import ValuesWrapper from "@/components/Translator/ValuesWrapper.vue";
import {useRoute} from "vue-router";
import Disqus from "@/components/Translator/Comments/Disqus.vue";
import Help from "@/components/Translator/Help.vue";
import {DEFAULT_TRANSLATOR_LANG} from "@/constants/DEFAULTS.js";

const dictionary = ref(null);
const metadata = reactive({
  value: {},
});
const interfaceText = reactive({
  value: {}
});

const route = useRoute();

const hash = ref(route.hash);
const dynamicSegment = ref(route.params.dynamicSegment || DEFAULT_TRANSLATOR_LANG);

const isLoadingData = ref(false);
const isError = ref(false);

function update(lang) {
  isLoadingData.value = true;
  updateInterface(lang)
    .then(() => updateTranslator(lang))
    .then(() => {
      isLoadingData.value = false;
      nextTick();
    })
    .catch(() => {
      isError.value = true;
      isLoadingData.value = false;
    });
}

async function updateInterface(lang) {
  const data = await fetch(`${import.meta.env.VITE_SERVER}translator_interface?lang=${lang}`)
    .then(response => response.json())
    .catch(error => new Error(error));

  if (data instanceof Error) {
    throw new Error();
  }
  return interfaceText.value = data;
}

async function updateTranslator(lang) {
  const data = await fetch(`${import.meta.env.VITE_SERVER}authoritarian_dictionary?lang=${lang}`)
    .then(response => response.json())
    .catch(error => new Error(error));

  if (data instanceof Error) {
    throw new Error();
  }

  const metadataVal = data.meta;
  let dataWithoutMeta = {...data};
  delete dataWithoutMeta.meta;

  dictionary.value = dataWithoutMeta;
  return metadata.value = metadataVal;
}

watch(
  () => route.params.dynamicSegment,
  (newPath) => {
    dynamicSegment.value = newPath;
    update(newPath);
  }
)

update(dynamicSegment.value);

function filterLetter(letter) {
  if (letter === interfaceText.value.NotAssigned) return interfaceText.value.theRestLetters;
  return letter;
}

function navigateToAnchorsLetter(id) {
  const letter = document.getElementById(id).closest('.letter-wrapper');
  if (letter) {
    history.pushState(null, null, `#${id}`);
    hash.value = id;
    window.scrollTo({
      top: letter.offsetTop,
      behavior: 'smooth'
    });
  }
}

watch(dictionary, (newVal) => {
  if (newVal) {
    nextTick(() => {
      if (route.hash) {
        navigateToAnchorsLetter(route.hash.slice(1));
      }
    });
  }
}, { immediate: true });
</script>

<template>
  <div class="d-flex w-1/2">
    <div class="card m-3 translator-body">
      <div class="card-body mt-3">
        <div v-if="isError">
          <div class="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m15 9-6 6"></path>
                  <path d="m9 9 6 6"></path>
                </svg>
              </div>
              <div class="ms-4">
                <h3 class="text-sm font-semibold">
                  Ladies and gentlemen, I've messed up somewhere and the dictionary doesn't seem to be functioning
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="!isLoadingData">
          <h2>
            <span class="text-4xl font-bold">{{ interfaceText.value.headline }}&nbsp;</span>
            <span class="text-xl italic">{{ interfaceText.value.headline_small }}</span>
          </h2>
          <Help :interface-text="interfaceText" />
          <div class="dictionary-wrapper">
            <ul v-for="(_, letter) in dictionary" :key="letter + dynamicSegment" class="mb-0 mt-3 letter-wrapper">
              <h2 class="text-2xl font-black">{{filterLetter(letter)}}</h2>
              <li v-for="(info, theWord) in dictionary[letter]" :key="theWord.word_key">
              <span
                class="font-bold hover:underline hover:cursor-default selectable-span"
                :id="info.word_key"
                :class="{ 'highlight': hash === info.word_key }"
                @click="navigateToAnchorsLetter(info.word_key)"
              >
                {{theWord}}
              </span>
                <span>
                –
              </span>
                <ValuesWrapper
                  :info="info"
                  :interface-text="interfaceText"
                />
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="text-center">
          <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <TranslatorMeta
      v-if="!isLoadingData && !isError"
      :interface-text=interfaceText
      class="mt-6"
      :metadata="metadata"
    />
    <div class="card mt-6">
      <Disqus v-if="!isLoadingData && !isError"/>
    </div>
  </div>
</template>

<style scoped>
.translator-body {
  margin-top: 3rem;
  width: 100%;
}
.dictionary-wrapper {
  margin-top: 3rem;
}
.selectable-span {
  position: relative;
}
.highlight {
  color: var(--color-highlight-text);
}
.selectable-span:hover::before {
  position: absolute;
  content: "";
  display: inline-block;
  background: url("../../assets/hash-icon.png") center / contain no-repeat;
  width: 10px;  /* adjust as necessary */
  height: 10px;  /* adjust as necessary */
  left: -12px;
  bottom: 3px;
}
</style>