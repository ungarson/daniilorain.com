<script setup>
import { defineProps } from 'vue';
import Value from "@/components/Translator/Value.vue";

const { values, interfaceText } = defineProps({
  values: {
    type: Object,
    required: true,
  },
  interfaceText: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <span>
    <span class="italic">{{ values.length }} meanings:</span>
    <div
      v-for="(nestedValues) in values"
      class="pl-3"
    >
      <span>–&nbsp;</span>
      <Value
        :key="nestedValues.key"
        :info="nestedValues"
        :interface-text
      />
    </div>
  </span>
</template>

<style scoped>

</style>