<script setup>
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from 'vue-router'

const matchReverse = {
  "ru": "Russian",
  "en": "English"
};

const router = useRouter();
const route = useRoute();

const dynamicSegment = route.params.dynamicSegment || "en";

const selected = ref(matchReverse[dynamicSegment]);

const newHash = computed(() => {
  return selected.value === matchReverse["en"] ? "en" : "ru";
});

watch(newHash, (newVal) => {
  router.push({ name: 'translator', params: { dynamicSegment: newVal } });
})
</script>

<template>
  <div class="d-flex flex-row">
    <a href="#comment-6435859399">What's this?</a>
    <select
      v-model="selected"
      class="absolute right-3 py-3 px-4 pe-9 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    >
      <option
        selected=""
        :value="'English'"
      >English</option>
      <option :value="'Russian'">Русский</option>
    </select>
  </div>
</template>

<style scoped>
select {
  margin-top: -2rem;
}
</style>