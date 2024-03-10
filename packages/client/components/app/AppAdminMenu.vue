<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import type { DropdownItem } from "~/components/base/BaseDropdown.vue";

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false,
  }
})

const router = useRouter();
const auth = useAuthStore();

const adminName = computed(() => {
  return auth.user ? auth.user.username : "Admin";
})

const options = computed<DropdownItem[]>(() => [
  { label: "Portfolio", action: () => router.push("/portfolio") },
  { label: "Profile", action: () => router.push("/profile") },
  { label: "Logout", action: () => auth.logout() }
])
</script>

<template>
  <base-dropdown color="primary" :items="options">
    <span v-if="props.sidebar">{{ adminName }}</span>
    <span v-else>{{ adminName }}</span>
  </base-dropdown>
</template>