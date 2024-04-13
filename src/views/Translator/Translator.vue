<script setup>
import { ref } from 'vue';
import TranslatorMeta from "@/components/Translator/TranslatorMeta.vue";
import ValuesWrapper from "@/components/Translator/ValuesWrapper.vue";
const dictionary = ref(null);
const metadata = ref(null);
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
</script>

<template>
  <div class="card m-3">
    <div class="card-body mt-3">
      <div v-if="dictionary">
        <h2 class="text-4xl font-bold">Dictionary</h2>
        <div class="dictionary-wrapper">
          <ul v-for="(_, letter) in dictionary" :key="letter" class="mb-0 mt-3">
            <h2 class="text-2xl font-black">{{filterLetter(letter)}}</h2>
            <li v-for="(info, theWord) in dictionary[letter]" :key="theWord.id">
              <span class="font-bold">
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
</style>