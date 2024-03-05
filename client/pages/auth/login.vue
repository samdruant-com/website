<script setup lang="ts">
const router = useRouter();

</script>

<template>
  <base-page>

    <div class="flex flex-row justify-center">
      <base-card class="w-1/2 flex flex-col">
        <p class="mx-auto text-2xl">Login</p>
        <AuthForm mode="login" @login="router.push('/')" />

        <p class="mt-2">Don't have an account? Register <NuxtLink to="/auth/register">here</NuxtLink>.</p>
      </base-card>
    </div>
  </base-page>
</template>
