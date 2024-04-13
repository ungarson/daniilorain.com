<script setup>
import { defineProps } from 'vue';

const { metadata } = defineProps({ metadata: 'Object' });

</script>

<template>
  <div class="bg-green-300 p-1.5">
    <p class="text-gray-700 text-sm">
      Last updated: {{ metadata["last_updated"] }};
    </p>
    <p class="text-gray-700 text-sm">
      Maintainer: {{ metadata["maintainer"] }}.
    </p>
  </div>
</template>

<style scoped>

</style>