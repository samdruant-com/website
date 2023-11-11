<script setup lang="ts">

function goToDashboard() {
  const router = useRouter();
  router.push('/');
}
</script>

<template>
	<BasePage>
		<v-sheet>
			<v-row justify="center">
				<v-col class="pa-1" cols="auto">
					<h2>Register</h2>
				</v-col>

				<v-divider class="border-opacity-0" />

				<v-col class="pa-1" cols="10" md="7">
					<AuthForm mode="register" @register="goToDashboard()"/>
				</v-col>

        <v-divider class="border-opacity-0" />

        <v-col class="pa-1" cols="auto">
					Already got an account? Login <NuxtLink to="/auth/login">here</NuxtLink>.
				</v-col>
			</v-row>
		</v-sheet>
	</BasePage>
</template>
