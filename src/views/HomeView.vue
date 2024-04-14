<script setup>
</script>

<template>
  <div id="projects">
    <div class="projects_wrapper">
      <h2 class="text-2xl font-bold">Current projects</h2>
      <ul>
        <li>
          <a href="https://www.youtube.com/@daniilorain/featured" target="_blank">Daniil Orain</a>
        </li>
        <li>
          <a href="https://orain.school/?utm_source=daniiloraincom" class="underline decoration-dashed" title="It's a Russian-language online school where I teach people how to do YouTube" target="_blank">Онлайн-школа ютьюбинга</a>
        </li>
        <RouterLink to="/en/translator">Authoritarian dictionary</RouterLink>
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
  </div>
</template>

<style>

@media screen and (max-width: 1024px) {
  #projects {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  }
  .projects_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
}

.projects_wrapper {
  &:nth-of-type(n + 2) {
    margin-top: 2em;
  }
}
</style>
