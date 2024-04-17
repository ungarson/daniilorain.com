<script setup>

import ValueExamples from "@/components/Translator/ValueExamples.vue";
import {computed, defineProps, ref} from 'vue';

const props = defineProps({
  info: Object,
  interfaceText: Object,
});

const { info, interfaceText } = props;
const openExample = ref(new Set());

const showExamples = computed(() => info.examples || info.remark);
</script>

<template>
  <span>
    <span
      @click="showExamples ? openExample.toggle(info.key) : null"
      :class="showExamples ? 'exampled-value cursor-help' : ''"
      v-html="info.value"
    >
    </span>
    <ValueExamples
      v-if="openExample.has(info.key)"
      :examples="info.examples"
      :remark="info.remark"
      :interface-text="interfaceText"
    />
  </span>
</template>

<style scoped>

</style>