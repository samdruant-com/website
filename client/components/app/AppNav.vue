<script setup lang="ts">
import { useNavigationStore } from "~/stores/navigation-store";
import { useSidebarStore } from "~/stores/sidebar-store";
import { useAuthStore } from "~/stores/auth-store";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();
const auth = useAuthStore();
const drawer = useSidebarStore();
const navigation = useNavigationStore();
</script>

<template>
	<v-app-bar id="app-nav" app flat color="transparent">
		<v-app-bar-nav-icon v-if="smAndDown" @click="drawer.toggle" />

		<router-link class="s-brand hide-link plain" to="/">
			<b>Sam Druant</b>
		</router-link>

		<v-spacer />

		<div v-if="!smAndDown">
			<base-btn
				v-for="option in navigation.options"
				:key="option.label"
				class="mx-1 s-brand hide-link"
				plain
				:color="option.color"
				:to="option.to"
				@click="option.action"
			>
				{{ option.label }}
			</base-btn>

			<app-admin-menu v-if="auth.isAuthenticated" />
		</div>
	</v-app-bar>
</template>

<style scoped>
@media (min-width: 600px) {
	#app-nav {
		padding: 0 2rem;
	}
}
</style>
