<script setup lang="ts">
const route = useRoute();

const inStartPage = computed<boolean>(
  () => route.path === "/"
);

const getClass = computed<string>(() => {
  let base = "w-full";

  if (!inStartPage.value) {
    base += " md:w-vw-70 md:mx-auto p-3";
  }

  return base;
});
</script>

<template>
  <div id="min-h-svh flex flex-col">
    <!-- navigation -->
    <app-nav v-if="!inStartPage" class="text-slate-900 pt-2 px-2" />
    <app-sidebar class="text-slate-900 z-50" />

    <!-- main content -->
    <main :class="`grow h-vh-90 text-slate-900 ${getClass}`">
      <slot />
    </main>

    <!-- footer -->
    <app-footer />
  </div>
</template>
