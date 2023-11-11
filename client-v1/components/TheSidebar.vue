<template>
	<v-navigation-drawer
		v-model="showSidebar"
		app>
		<template #prepend>
			<div class="pa-2">
				<nuxt-link
					class="s-brand hide-link"
					to="/">
					<h2 v-if="user">
						{{ user.name }}
					</h2>
					<h2 v-else>
						Welcome
					</h2>
				</nuxt-link>
			</div>
		</template>

		<v-list nav>
			<v-list-item
				v-for="page in routes"
				:key="page.path"
				@click="goTo(page.path)">
				<b v-if="$route.path.includes(page.path)">{{ page.name }}</b>
				<span v-else>{{ page.name }}</span>
			</v-list-item>
			<v-list-item
				v-if="isLoggedIn"
				class="red--text"
				@click="logout()">
				<b>Logout</b>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	name: "Sidebar",
	computed: {
		...mapGetters({
			user: "user/getUser",
			routes: "app/nav/getRoutes"
		}),
		showSidebar: {
			get: function(){ return this.$store.getters["app/nav/getSidebarVisibility"];},
			set: function(value){ return this.$store.commit("app/nav/setSidebarVisbitility", value);}
		}
	},
	methods: {
		...mapMutations({
			logout: "auth/logout"
		}),
		goTo(path){
			if(this.$route.path !== path) this.$router.push(path);
			this.$store.commit("app/nav/setSidebarVisbitility", false);
		}
	}
};
</script>
