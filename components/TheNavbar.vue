<template>
	<v-app-bar
		app
		dense
		elevation="0"
		color="transparent"
		:value="inStartPage">
		<v-app-bar-title>
			<nuxt-link
				class="hide-link"
				to="/">
				<b>Sam Druant</b>
			</nuxt-link>
		</v-app-bar-title>

		<v-spacer />

		<div v-if="isScreenDesktop">
			<nuxt-link
				v-for="page in routes"
				:key="page.path"
				class="mx-1 hide-link"
				:to="page.path">
				{{ page.name }}
			</nuxt-link>
		</div>
		<v-app-bar-nav-icon
			v-else
			@click="setSidebar(!showSidebar)" />
	</v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	name: "Navbar",
	computed: {
		...mapGetters({
			routes: "app/nav/getRoutes",
			showSidebar: "app/sidebar/getVisibility"
		}),
		inStartPage(){
			return this.$route.path !== "/";
		}
	},
	methods: {
		...mapMutations({
			setSidebar: "app/sidebar/setVisbitility"
		})
	}
};
</script>
