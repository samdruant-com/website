<template>
	<v-app>
		<the-navbar />
		<the-sidebar v-if="showSidebar" />

		<v-main>
			<nuxt />
		</v-main>

		<the-footer />
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";

import TheFooter from "~/components/TheFooter.vue";
import TheNavbar from "~/components/TheNavbar.vue";
import TheSidebar from "~/components/TheSidebar.vue";

export default {
	components: { TheSidebar, TheNavbar, TheFooter },
	head() {
		return {
			meta: [
				// hid for image in url
				{
					hid: "og:image",
					property: "og:image",
					content: "/images/DRAGONS1.jpg"
				},
				{
					hid: "og:url",
					property: "og:type",
					content: window.location.origin + this.$route.path
				}
			]
		};
	},
	computed: {
		...mapGetters({
			showSidebar: "app/sidebar/getVisibility"
		})
	}
};
</script>
