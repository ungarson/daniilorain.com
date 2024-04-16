<script setup>

import ValueExamples from "@/components/Translator/ValueExamples.vue";
import {defineProps, ref} from 'vue';

const props = defineProps({
  info: Object,
  interfaceText: Object,
});

const { info, interfaceText } = props;
const openExample = ref(new Set());
</script>

<template>
  <span>
    <span
      @click="info.examples ? openExample.toggle(info.key) : null"
      :class="info.examples ? 'exampled-value cursor-help' : ''"
      v-html="info.value"
    >
    </span>
    <ValueExamples
      v-if="openExample.has(info.key)"
      :examples="info.examples"
      :interface-text="interfaceText"
    />
  </span>
</template>

<style scoped>

</style>