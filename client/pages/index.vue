<script setup lang="ts">
import { useSidebarStore } from '~/stores/sidebar-store';
import { useNotification } from '~/composables/useNotification';
import type { ActionItem } from '~/components/base/BaseCard.vue';

const runtimeConfig = useRuntimeConfig()
const sidebarStore = useSidebarStore();
const { notify } = useNotification();

const features: ActionItem[] = [
  {
    label: 'Sidebar',
    description: 'Toggle the sidebar',
    action: () => sidebarStore.toggle()
  },
  {
    label: 'Authentication',
    description: 'Basic authentication',
    to: '/auth/login',
  },
  {
    label: 'Forms',
    description: 'Form examples',
    to: '/form',
  },
  {
    label: 'Localization',
    description: 'Support mutliple languages',
    to: '/localize'
  },
  {
    label: 'Notifications',
    description: 'Trigger notifications',
    action: () => notify('Hello', 'This is a notification')
  },
]

</script>

<template>
  <base-page>
    <v-row class="mt-2">
      <v-col cols="11" md="6">
        <base-card>
          <v-card-title>Env Support</v-card-title>
          <v-card-subtitle>Supports public and server-side env variables</v-card-subtitle>
          <v-card-text>This is an environement: <b>{{ runtimeConfig.public.apiUrl }}</b></v-card-text>
        </base-card>
      </v-col>

      <v-col v-for="feature in features" cols="11" md="6">
        <base-card>
          <v-card-title>{{ feature.label }}</v-card-title>
          <v-card-subtitle>{{ feature.description }}</v-card-subtitle>

          <v-card-actions>
            <base-btn color="primary" :to="feature.to" @click="feature.action">
              {{ feature.label }}
            </base-btn>
          </v-card-actions>
        </base-card>
      </v-col>
    </v-row>
  </base-page>
</template>