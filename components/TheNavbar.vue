<template>
	<b-navbar toggleable="lg">
		<b-navbar-brand
			class="brand"
			href="#">
			Sam Druant
		</b-navbar-brand>

		<b-nav-toggle
			target="sidebar"
			@click="toggleSidebar" />

		<b-collapse is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item>
					<nuxt-link
						class="link mx-1"
						to="#">
						Work
					</nuxt-link>
					<nuxt-link
						class="link mx-1"
						to="#">
						CV
					</nuxt-link>
				</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
	import { mapMutations } from "vuex";

	export default {
		name: "Navbar",
		methods: {
			...mapMutations({
				toggleSidebar: "base/sidebar/toggle"
			})
		}
	};
</script>
