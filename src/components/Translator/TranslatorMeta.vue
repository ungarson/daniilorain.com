<script setup>
import {computed, defineProps, watch} from 'vue';

const props = defineProps({
  metadata: {
    type: Object,
    required: true,
  },
  interfaceText: {
    type: Object,
    required: true,
  },
});

const { metadata, interfaceText } = props;
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700" role="alert">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      </div>
      <div class="ms-3">
        <h3 class="text-gray-800 font-semibold dark:text-white">
          {{ interfaceText.value.lastUpdated }}: {{ metadata.value["last_updated"] }}
        </h3>
      </div>
    </div>
  </div>
  <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700 mt-2" role="alert">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      </div>
      <div class="ms-3">
        <h3 class="text-gray-800 font-semibold dark:text-white">
          {{ interfaceText.value.Contributors }}: {{ metadata.value["maintainer"] }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>