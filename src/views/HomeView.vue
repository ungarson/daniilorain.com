<script setup>
</script>

<template>
  <div id="home-view">
    <header>
      <img alt="Daniil Orain's profile picture" class="logo" src="@/assets/daniilorain.jpeg" width="320" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contacts</RouterLink>
      </nav>
    </header>
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
  </div>
</template>

<style>
#home-view {
  display: grid;
  grid-template-columns: 1fr;
}
header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  #home-view {
    grid-template-columns: 1fr 1fr;
  }
  header {
    margin-left: auto;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

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
