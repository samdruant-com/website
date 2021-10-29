<template>
	<div id="start-page">
		<h1 class="text-center white--text">
			<nuxt-link
				class="s-brand hide-link"
				to="/contact">
				Sam Druant
			</nuxt-link>
		</h1>
	</div>
</template>

<script>
export default {
	name: "Landing"
};
</script>

<style scoped>
#start-page {
	height: 100vh;
	background-size:cover;
	background-color: #cccccc;
	background-repeat: no-repeat;
	background-image: url('~assets/images/img-1.webp');

	padding: 30vh 5vw;
}
</style>
