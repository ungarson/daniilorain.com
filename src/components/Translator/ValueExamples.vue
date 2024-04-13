<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  examples: Array,
});

const { examples } = props;
</script>

<template>
  <div class="bg-gray-700 p-1.5">
    <ul v-for="example in examples">
      <li>
        <p>
          <span class="text-red-500">Bullshit:</span>
          {{ example['fake'] }}
        </p>
        <p>
          <span class="text-green-500">Truth: </span>
          {{ example['real'] }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>