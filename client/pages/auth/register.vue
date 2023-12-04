<script setup lang="ts">
const router = useRouter();

</script>

<template>
	<base-page>
		<base-card>
			<v-row justify="center">
				<v-col class="pa-1" cols="auto">
					<h2>Register</h2>
				</v-col>

				<v-divider class="border-opacity-0" />

				<v-col class="ma-1" cols="12" md="7">
					<AuthForm mode="register" @register="router.push('/')"/>
				</v-col>

        <v-divider class="border-opacity-0" />

        <v-col class="ma-1" cols="12" md="auto">
					Already got an account? Login <NuxtLink to="/auth/login">here</NuxtLink>.
				</v-col>
			</v-row>
		</base-card>
	</base-page>
</template>
