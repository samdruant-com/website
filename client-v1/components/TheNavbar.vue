<template>
	<v-app-bar
		app
		dense
		elevation="0"
		color="transparent"
		:value="inStartPage">
		<v-app-bar-title>
			<nuxt-link
				class="s-brand hide-link"
				to="/">
				<b v-if="user">{{ user.name }}</b>
				<b v-else>Welcome</b>
			</nuxt-link>
		</v-app-bar-title>

		<v-spacer />

		<div v-if="isScreenDesktop">
			<nuxt-link
				v-for="page in routes"
				:key="page.path"
				class="s-brand mx-1 hide-link"
				:to="page.path">
				<b v-if="$route.path.includes(page.path)">{{ page.name }}</b>
				<span v-else>{{ page.name }}</span>
			</nuxt-link>
			<base-btn
				v-if="isLoggedIn"
				small
				color="error"
				class="s-brand mx-1 hide-link"
				@click="logout()">
				Logout
			</base-btn>
		</div>
		<v-app-bar-nav-icon
			v-else
			@click="setSidebar(!showSidebar)" />
	</v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseBtn from "./base/BaseBtn.vue";

export default {
	name: "Navbar",
	components: { BaseBtn },
	computed: {
		...mapGetters({
			user: "user/getUser",
			routes: "app/nav/getRoutes",
			showSidebar: "app/nav/getSidebarVisibility"
		}),
		inStartPage(){
			return this.$route.path !== "/";
		}
	},
	methods: {
		...mapMutations({
			setSidebar: "app/nav/setSidebarVisbitility",
			logout: "auth/logout"
		})
	}
};
</script>
