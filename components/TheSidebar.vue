<template>
	<b-sidebar
		:visible="showSidebar"
		no-header
		backdrop
		backdrop-variant="dark"
		@hidden="setSidebarVisibility(false)">
		<b-row class="my-2 mx-2">
			<b-col
				cols="auto my-2 mx-2"
				class="brand">
				Sam Druant
			</b-col>
		</b-row>

		<b-row
			class="my-2 mx-2"
			align-h="center">
			<b-col
				cols="10"
				class="my-2">
				<nuxt-link
					class="link"
					to="#">
					Work
				</nuxt-link>
			</b-col>
			<b-col
				cols="10"
				class="my-2">
				<nuxt-link
					class="link"
					to="#">
					CV
				</nuxt-link>
			</b-col>
			<b-col
				cols="10"
				class="my-2">
				<mail-icon />
				&nbsp;
				<a
					class="link"
					href="mailto: sam.druant@gmail.com">Send Email</a>
			</b-col>
		</b-row>

		<template #footer>
			<b-row
				class="my-2 mx-2"
				align-h="center">
				<b-col
					cols="10"
					class="my-2">
					<b-button
						block
						variant="outline-dark"
						@click="setSidebarVisibility(false);">
						Close Now
					</b-button>
				</b-col>
			</b-row>
		</template>
	</b-sidebar>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import {BIconMailbox} from "bootstrap-vue";

	export default {
		name: "Sidebar",
		components: {
			"mail-icon": BIconMailbox
		},
		computed: {
			...mapGetters({
				showSidebar: "base/sidebar/getVisibility"
			})
		},
		methods: {
			...mapMutations({
				setSidebarVisibility: "base/sidebar/setVisbitility"
			})
		}
	};
</script>
