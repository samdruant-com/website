<template>
	<b-navbar toggleable="lg">
		<b-navbar-brand
			class="brand"
			href="/">
			Sam Druant
		</b-navbar-brand>

		<b-nav-toggle
			target="sidebar"
			@click="toggleSidebar" />

		<b-collapse is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown class="mx-1">
					<template #button-content>
						<span class="link">
							Work
						</span>
					</template>
					<b-dropdown-item
						v-for="item in works"
						:key="item">
						<nuxt-link
							class="link"
							to="#">
							{{ item }}
						</nuxt-link>
					</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item class="mx-1">
					<nuxt-link
						class="link"
						to="about">
						About
					</nuxt-link>
				</b-nav-item>
				<b-nav-item class="mx-1">
					<nuxt-link
						class="link"
						to="cv">
						CV
					</nuxt-link>
				</b-nav-item>
				<b-nav-item class="mx-1">
					<a
						href="mailto: sam.druant@gmail.com"
						class="link">
						Send email
					</a>
					&nbsp;
					<mail-icon />
				</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
	import { mapMutations } from "vuex";
	import { BIconMailbox } from "bootstrap-vue";

	export default {
		name: "Navbar",
		components: {
			"mail-icon": BIconMailbox
		},
		computed: {
			works () {
				return ["2017", "2018", "2019", "2020"];
			}
		},
		methods: {
			...mapMutations({
				toggleSidebar: "base/sidebar/toggle"
			})
		}
	};
</script>
