<script setup lang="ts">
const route = useRoute();

const inStartPage = computed<boolean>(
  () => route.path === "/"
);
</script>

<template>
  <v-app id="app-layout">
    <!-- navigation -->
    <app-nav v-if="!inStartPage" />
    <app-sidebar />

    <!-- main content -->
    <v-main id="app-content">
      <v-row justify="center">
        <v-col :cols="inStartPage ? 12 : 11" :md="inStartPage ? 12 : 10">
          <slot></slot>
        </v-col>
      </v-row>
    </v-main>

    <!-- footer -->
    <app-footer />
  </v-app>
</template>

<style scoped>
#app-layout {
  max-width: 100vw;
}

#app-content {
  min-height: 100vh;
}
</style>