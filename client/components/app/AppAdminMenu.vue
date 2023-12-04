<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false,
  }
})

const auth = useAuthStore();

const adminName = computed(() => {
  return auth.user ? auth.user.username : "Admin";
})
</script>

<template>
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <base-btn id="admin-menu" color="secondary" :large="props.sidebar" v-bind="props">
        <h2 v-if="props.sidebar">{{ adminName }}</h2>
        <span v-else>{{ adminName }}</span>
      </base-btn>
    </template>

    <v-list variant="flat" elevation="0">
      <v-list-item to="/profile">
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item class="text-error" @click="auth.logout()">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
