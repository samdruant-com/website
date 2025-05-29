<script setup lang="ts">
const route = useRoute();

const inStartPage = computed<boolean>(
  () => route.path === "/"
);

const getClass = computed<string>(() => {
  return inStartPage.value
    ? ""
    : "md:w-vw-70 md:mx-auto px-3 py-5";
});
</script>

<template>
  <div class="min-h-svh flex flex-col">
    <app-nav v-if="!inStartPage" class="mt-1 pt-2 px-2" />
    <app-sidebar class="z-50" />

    <main :class="`${getClass} w-full flex-grow min-h-vh-90`">
      <slot />
    </main>

    <app-footer class="mx-auto w-full md:w-vw-70" />
  </div>
</template>
