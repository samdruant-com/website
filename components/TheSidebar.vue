<template>
	<v-navigation-drawer
		v-model="showSidebar"
		app>
		<template #prepend>
			<div class="pa-2">
				<nuxt-link
					class="s-brand hide-link"
					to="/">
					<h2>Sam Druant</h2>
				</nuxt-link>
			</div>
		</template>

		<v-list nav>
			<v-list-item
				v-for="page in routes"
				:key="page.path"
				@click="goTo(page.path)">
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
	},
	methods: {
		goTo(path){
			if(this.$route.path !== path) this.$router.push(path);
			this.$store.commit("app/sidebar/setVisbitility", false);
		}
	}
};
</script>
