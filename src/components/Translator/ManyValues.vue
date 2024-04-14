<script setup>
import { defineProps } from 'vue';
import Value from "@/components/Translator/Value.vue";

const { values } = defineProps({ values: 'Object' });
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
      />
    </div>
  </span>
</template>

<style scoped>

</style>