<script setup lang="ts">
const route = useRoute();

const inStartPage = computed<boolean>(
  () => route.path === "/"
);
</script>

<template>
  <v-app>
    <!-- navigation -->
    <app-nav v-if="!inStartPage" />
    <app-sidebar />

    <!-- main content -->
    <v-main>
      <v-row justify="center">
        <v-col :cols="inStartPage ? 12 : 11" :md="inStartPage ? 12 : 10">
          <slot></slot>
        </v-col>
      </v-row>
    </v-main>

    <!-- footer -->
    <app-footer />

    <!-- notification -->
    <Toaster />
  </v-app>
</template>
