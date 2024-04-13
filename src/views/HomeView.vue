<script setup>
</script>

<template>
  <main>
    <div class="projects_wrapper">
      <h2 class="text-2xl font-bold">Current projects</h2>
      <ul>
        <li>
          <a href="https://www.youtube.com/@daniilorain/featured" target="_blank">Daniil Orain</a>
        </li>
        <li>
          <a href="https://orain.school/?utm_source=daniiloraincom" class="underline decoration-dashed" title="It's a Russian-language online school where I teach people how to do YouTube" target="_blank">Онлайн-школа ютьюбинга Даниила Ораина</a>
        </li>
        <RouterLink to="/translator">Authoritarian dictionary</RouterLink>
      </ul>
    </div>

    <div class="projects_wrapper">
      <h2 class="text-2xl font-bold">Previous projects</h2>
      <ul>
        <li>
          <a href="https://www.youtube.com/@1420channel" target="_blank">1420 by Daniil Orain</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style>
.projects_wrapper {
  &:nth-of-type(n + 2) {
    margin-top: 2em;
  }
}
</style>
