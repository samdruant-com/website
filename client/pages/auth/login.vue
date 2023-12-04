<script setup lang="ts">
const router = useRouter();

</script>

<template>
  <base-page>
    <base-card>
      <v-row justify="center">
        <v-col class="pa-1" cols="auto">
          <h2>Login</h2>
        </v-col>

        <v-divider class="border-opacity-0" />

        <v-col class="ma-1" cols="12" md="7">
          <AuthForm mode="login" @login="router.push('/')" />
        </v-col>

        <v-divider class="border-opacity-0" />

        <v-col class="ma-1" cols="12" md="auto">
          Don't have an account? Register <NuxtLink to="/auth/register">here</NuxtLink>.
        </v-col>
      </v-row>
    </base-card>
  </base-page>
</template>
