<script setup lang="ts">
import type { DropdownItem } from "~/components/base/BaseDropdown.vue";
import { useAuthStore } from "~/stores/auth.store";

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const auth = useAuthStore();

const adminName = computed(() => {
  return auth.user ? auth.user.username : "Admin";
});

const options = computed<DropdownItem[]>(() => [
  { label: "Portfolio", action: () => router.push("/portfolio") },
  { label: "Profile", action: () => router.push("/profile") },
  {
    label: "Logout",
    color: "text-red-500",
    action: () => {
      auth.logout();
      router.push("/auth/login");
    }
  }
]);
</script>

<template>
  <div :class="`dropdown ${props.sidebar ? '' : 'dropdown-end'} flex flex-col content-end`">
    <div
      tabindex="0"
      role="button"
      :class="`${props.sidebar ? 'text-4xl' : 'text-xl'} text-primary font-semibold underline`"
    >
      {{ adminName }}
    </div>
    <ul tabindex="0" class="dropdown-content z-[1] menu mt-2 p-2 shadow bg-base-100 rounded-box w-52">
      <li v-for="item in options" :key="item.label" :class="`${item.color ? item.color : ''}`">
        <a @click="item.action">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>
