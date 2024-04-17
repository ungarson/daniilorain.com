<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  examples: Array,
  remark: {
    type: String,
    required: false,
  },
  interfaceText: Object,
});

const { examples, interfaceText } = props;
</script>

<template>
  <div class="wrapper p-1.5">
    <ul v-for="example in examples">
      <li>
        <p>
          <span class="error-text">{{ interfaceText?.value.Bullshit }}:</span>&nbsp;
          <span class="explanation">{{ example['fake'] }}</span>
        </p>
        <p>
          <span class="text-green-500">{{ interfaceText?.value.Truth }}: </span>
          <span class="explanation">{{ example['real'] }}</span>
        </p>
      </li>
    </ul>
    <p v-if="remark">
      <span class="text-orange-400">
        {{ interfaceText?.value.GoodToKnow }}:
      </span>
      <span>
        {{ remark }}
      </span>
    </p>
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