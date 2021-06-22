<template>
	<div id="app-container">
		<div id="app-nav">
			<the-navbar />
			<the-sidebar v-if="showSidebar" />
		</div>
		<div id="app-content">
			<nuxt />
		</div>
		<div id="app-footer">
			<the-footer />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import TheFooter from "../components/TheFooter.vue";
	import TheNavbar from "../components/TheNavbar.vue";
	import TheSidebar from "../components/TheSidebar.vue";

	export default {
		components: { TheSidebar, TheNavbar, TheFooter },
		computed: {
			...mapGetters({
				showSidebar: "base/sidebar/getVisibility"
			})
		}
	};
</script>
