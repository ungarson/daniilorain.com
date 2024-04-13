<script setup>

import ManyValues from "@/components/Translator/ManyValues.vue";
import Value from "@/components/Translator/Value.vue";
import { defineProps } from 'vue';

const props = defineProps({
  info: Object,
});

const { info } = props;
</script>

<template>
  <span>
    <ManyValues v-if="info.values" :values="info.values" />
    <Value v-else :info="info" />
  </span>
</template>

<style scoped>

</style>