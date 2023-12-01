<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const auth = useAuthStore();
</script>

<template>
  <div>
    <base-btn id="admin-menu" color="error">
      {{ auth.user ? auth.user.username : "Admin" }}
    </base-btn>

    <v-menu activator="#admin-menu" color="primary" open-on-hover>
      <v-list variant="flat" elevation="0">
        <v-list-item to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="auth.logout()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
