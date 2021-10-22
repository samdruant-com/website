<template>
	<v-navigation-drawer
		v-model="showSidebar"
		app>
		<template #prepend>
			<nuxt-link
				class="brand"
				to="/">
				Sam Druant
			</nuxt-link>
		</template>

		<v-list nav>
			<v-list-item
				v-for="page in routes"
				:key="page.path"
				:to="page.path">
				{{ page.name }}
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "Sidebar",
	computed: {
		...mapGetters({
			routes: "app/nav/getRoutes"
		}),
		showSidebar: {
			get: function(){ return this.$store.getters["app/sidebar/getVisibility"];},
			set: function(value){ return this.$store.commit("app/sidebar/setVisbitility", value);}
		}
	}
};
</script>
