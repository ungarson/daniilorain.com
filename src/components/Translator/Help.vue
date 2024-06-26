<script setup>
import {computed, defineProps, onBeforeUnmount, onMounted, ref, watch} from "vue";

import {useRoute, useRouter} from 'vue-router'
import {DEFAULT_TRANSLATOR_LANG} from "@/constants/DEFAULTS.js";

const props = defineProps({
  interfaceText: Object,
});

const matchReverse = {
  "ru": "Russian",
  "en": "English"
};

const engOptionText = ref(matchReverse["en"]);
const ruOptionText = ref(matchReverse["ru"]);

const router = useRouter();
const route = useRoute();

const dynamicSegment = route.params.dynamicSegment || DEFAULT_TRANSLATOR_LANG;

const selected = ref(matchReverse[dynamicSegment]);

const newHash = computed(() => {
  return selected.value === matchReverse["en"] ? "en" : "ru";
});

watch(newHash, (newVal) => {
  router.push({ name: 'translator', params: { dynamicSegment: newVal } });
})

const checkAndSetText = () => {
  if (window.innerWidth < 1024) {
    engOptionText.value = 'En';
    ruOptionText.value = 'Ру';
  } else {
    engOptionText.value = 'English';
    ruOptionText.value = 'Russian';
  }
}

onMounted(() => {
  window.addEventListener('resize', checkAndSetText)
  checkAndSetText()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkAndSetText)
})

const { interfaceText } = props;
</script>

<template>
  <div class="d-flex flex-row">
    <a :href="interfaceText.value.learnMoreExplanationComment">{{ interfaceText.value.learnMoreText }}</a>
    <select
      v-model="selected"
      class="absolute right-3 py-2 px-3 lg:py-3 lg:px-4 lg:pe-9 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-black-soft dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    >
      <option
        selected=""
        :value="'English'"
      >{{ engOptionText }}</option>
      <option :value="'Russian'"> {{ ruOptionText }}</option>
    </select>
  </div>
</template>

<style scoped>
select {
  margin-top: -2rem;
}
</style>