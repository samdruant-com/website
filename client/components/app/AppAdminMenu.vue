<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const auth = useAuthStore();
</script>

<template>
	<base-btn id="admin-menu" color="primary">
		{{ auth.user ? auth.user.username : "Admin" }}
	</base-btn>
	<v-menu
		activator="#admin-menu"
		open-on-hover
		color="primary"
	>
		<v-list>
			<v-list-item @click="auth.logout()">
				<v-list-item-title>Logout</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>
