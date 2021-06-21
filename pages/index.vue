<template>
	<div id="app-container">
		<div id="app-nav">
			<the-navbar />
			<the-sidebar v-if="showSidebar" />
		</div>
		<div id="app-content">
			content
		</div>
		<div id="app-footer">
			<the-footer />
		</div>
	</div>
</template>

<script>
import TheFooter from "../components/TheFooter.vue";
import TheNavbar from "../components/TheNavbar.vue";
import TheSidebar from "../components/TheSidebar.vue";
export default {
	components: { TheSidebar, TheNavbar, TheFooter },
	data: function() {
		return {
			showSidebar: false
		};
	}
};
</script>

<style>
#app-container {
	min-height: 80vh;

	display: grid;
	place-items: center;
	grid-template-rows: auto 1fr auto;
}

#app-footer {
	max-height: 5vh;
}
</style>
