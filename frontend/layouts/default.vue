<template>
	<v-app>
		<the-navbar />
		<the-sidebar v-if="showSidebar" />

		<v-main>
			<nuxt />
		</v-main>

		<the-footer />
		<the-notification />
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";

import TheFooter from "~/components/TheFooter.vue";
import TheNavbar from "~/components/TheNavbar.vue";
import TheSidebar from "~/components/TheSidebar.vue";
import TheNotification from "~/components/TheNotification.vue";
import SeoUtil from "~/utils/seo.js";

export default {
	components: { TheSidebar, TheNavbar, TheFooter, TheNotification },
	head() {
		return SeoUtil.formulateSeo({
			title: this.user?.name,
			description: this.user?.bio,
			image: window.location.origin + "/images/DRAGONS1.jpg"
		});
	},
	computed: {
		...mapGetters({
			user: "user/getUser",
			showSidebar: "app/nav/getSidebarVisibility"
		})
	},
	async mounted() {
		await this.$store.dispatch("user/init");
	}
};
</script>
