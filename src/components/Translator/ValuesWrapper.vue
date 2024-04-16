<script setup>

import ManyValues from "@/components/Translator/ManyValues.vue";
import Value from "@/components/Translator/Value.vue";
import { defineProps } from 'vue';

const props = defineProps({
  info: Object,
  interfaceText: Object,
});

const { info, interfaceText } = props;
</script>

<template>
  <span>
    <ManyValues v-if="info.values" :values="info.values" :interface-text="interfaceText" />
    <Value v-else :info="info" :interface-text="interfaceText" />
  </span>
</template>

<style scoped>

</style>