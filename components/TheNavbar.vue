<template>
	<v-app-bar app>
		<v-app-bar-title to="/">
			Sam Druant
		</v-app-bar-title>

		<v-spacer />

		<div v-if="isScreenDesktop">
			<v-btn
				v-for="page in routes"
				:key="page.path"
				text
				class="mx-1"
				:to="page.path">
				{{ page.name }}
			</v-btn>
		</div>
		<v-app-bar-nav-icon
			v-else
			@click="toggleSidebar" />
	</v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	name: "Navbar",
	computed: {
		...mapGetters({
			routes: "app/nav/getRoutes"
		})
	},
	methods: {
		...mapMutations({
			toggleSidebar: "app/sidebar/toggle"
		})
	}
};
</script>
