<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  examples: Array,
});

const { examples } = props;
</script>

<template>
  <div class="wrapper p-1.5">
    <ul v-for="example in examples">
      <li>
        <p>
          <span class="text-red-500">Bullshit:</span>&nbsp;
          <span class="explanation">{{ example['fake'] }}</span>
        </p>
        <p>
          <span class="text-green-500">Truth: </span>
          <span class="explanation">{{ example['real'] }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--vt-c-indigo);
}
.wrapper .explanation {
  color: var(--vt-c-text-dark-2);
}
</style>