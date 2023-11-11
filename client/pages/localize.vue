<script setup lang="ts">
</script>

<template>
  <base-page>
    <v-row justify="center">
      <v-col cols="auto">
        <language-btn></language-btn>
      </v-col>
      <v-divider class="border-opacity-0"></v-divider>
      <v-col cols="12" sm="8" md="6">
        <base-card class="pa-1">
          <v-card-text>
            <h2>{{ $t('example.title') }}</h2>
            <p class="mt-2">{{ $t("example.message", { name: "Alice", projectName: "Nuxt Template" }) }}</p>
          </v-card-text>
        </base-card>
      </v-col>
    </v-row>
  </base-page>
</template>