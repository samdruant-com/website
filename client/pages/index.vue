<script setup lang="ts">

useSeoSetup();

</script>

<template>
  <div id="start-page">
    <h1 class="text-center white--text">
      <NuxtLink class="s-brand hide-link" to="/projects"> Sam Druant </NuxtLink>
    </h1>
  </div>
</template>

<style scoped>
#start-page {
  height: 100vh;
  background-size: cover;
  background-color: #cccccc;
  background-repeat: no-repeat;
  background-image: url("/images/landing.webp");
  padding: 30vh 5vw;
}
</style>
