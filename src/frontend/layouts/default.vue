<template>
  <app-nav class="mt-1 pt-2 px-2" />
  <app-sidebar class="z-50" />

  <main class="w-full flex-grow min-h-vh-90 md:w-vw-70 md:mx-auto px-3 py-5">
    <slot />
  </main>

  <app-footer class="mx-auto w-full md:w-vw-70" />
</template>
