<script setup>
import {nextTick, ref, watch} from 'vue';
import TranslatorMeta from "@/components/Translator/TranslatorMeta.vue";
import ValuesWrapper from "@/components/Translator/ValuesWrapper.vue";
import {useRoute} from "vue-router";
const dictionary = ref(null);
const metadata = ref(null);

const route = useRoute();

fetch(`${import.meta.env.VITE_SERVER}authoritarian_dictionary`)
  .then(response => response.json())
  .then(data => {
    metadata.value = data.meta;
    let dataWithoutMeta = {...data};
    delete dataWithoutMeta.meta;
    return dictionary.value = dataWithoutMeta;
  });

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
  <div class="card m-3">
    <div class="card-body mt-3">
      <div v-if="dictionary">
        <h2 class="text-4xl font-bold">Dictionary</h2>
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
              <ValuesWrapper :info="info" />
            </li>
          </ul>
        </div>
      </div>
      <TranslatorMeta class="mt-3" :metadata="metadata" />
      <div v-if="!dictionary" class="text-center">
        <div class="spinner-border spinner-border-sm"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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