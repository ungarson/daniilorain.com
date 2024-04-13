<script setup>

import ValueExamples from "@/components/Translator/ValueExamples.vue";
import {defineProps, ref} from 'vue';

const props = defineProps({
  info: Object,
});

const { info } = props;
const openExample = ref(new Set());
</script>

<template>
  <span>
    <span
      @click="info.examples ? openExample.toggle(info.id) : null"
      :class="info.examples ? 'exampled-value cursor-help' : ''"
    >
      {{info.value}}
    </span>
    <ValueExamples
      v-if="openExample.has(info.id)"
      :examples="info.examples"
    />
  </span>
</template>

<style scoped>

</style>