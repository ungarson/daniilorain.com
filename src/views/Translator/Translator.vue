<script setup>
import {nextTick, reactive, ref, watch} from 'vue';
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

const dynamicSegment = route.params.dynamicSegment || DEFAULT_TRANSLATOR_LANG;

function update(lang) {
  updateInterface(lang).then(() => updateTranslator(lang)).then(() => nextTick());
}

async function updateInterface(lang) {
  const data = await fetch(`${import.meta.env.VITE_SERVER}translator_interface?lang=${lang}`)
    .then(response => response.json());

  return interfaceText.value = data;
}

async function updateTranslator(lang) {
  const data = await fetch(`${import.meta.env.VITE_SERVER}authoritarian_dictionary?lang=${lang}`)
    .then(response => response.json());

  const metadataVal = data.meta;
  let dataWithoutMeta = {...data};
  delete dataWithoutMeta.meta;

  dictionary.value = dataWithoutMeta;
  return metadata.value = metadataVal;
}

watch(
  () => route.params.dynamicSegment,
  (newPath) => {
    update(newPath);
  }
)

update(dynamicSegment);

function filterLetter(letter) {
  if (letter === "NA") return '...';
  return letter;
}

function navigateToAnchorsLetter(id) {
  const letter = document.getElementById(id).closest('.letter-wrapper');
  if (letter) {
    history.pushState(null, null, `#${id}`);
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
  <div class="d-flex">
    <div class="card m-3 translator-body">
      <div class="card-body mt-3">
        <div v-if="dictionary && interfaceText">
          <h2>
            <span class="text-4xl font-bold">{{ interfaceText.value.headline }}&nbsp;</span>
            <span class="text-xl italic">{{ interfaceText.value.headline_small }}</span>
          </h2>
          <Help :interface-text="interfaceText" />
          <div class="dictionary-wrapper">
            <ul v-for="(_, letter) in dictionary" :key="letter" class="mb-0 mt-3 letter-wrapper">
              <h2 class="text-2xl font-black">{{filterLetter(letter)}}</h2>
              <li v-for="(info, theWord) in dictionary[letter]" :key="theWord.word_key">
              <span
                class="font-bold hover:underline hover:cursor-default selectable-span"
                :id="info.word_key"
                @click="navigateToAnchorsLetter(info.word_key)"
              >
                {{theWord}}
              </span>
                <span>
                –
              </span>
                <ValuesWrapper :info="info" :interface-text="interfaceText" />
              </li>
            </ul>
          </div>
        </div>
        <div v-if="!dictionary" class="text-center">
          <div class="spinner-border spinner-border-sm"></div>
        </div>
      </div>
    </div>
    <TranslatorMeta
      :interface-text=interfaceText
      class="mt-6"
      :metadata="metadata"
    />
    <div class="card mt-6">
      <Disqus/>
    </div>
  </div>
</template>

<style scoped>
.translator-body {
  margin-top: 6rem;
}
.dictionary-wrapper {
  margin-top: 3rem;
}
.selectable-span {
  position: relative;
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