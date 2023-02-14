<template>
	<div id="start-page">
		<h1 class="text-center white--text">
			<nuxt-link
				class="s-brand hide-link"
				to="/works">
				<span v-if="user">{{ user.name }}</span>
				<span v-else>Welcome</span>
			</nuxt-link>
		</h1>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import SeoUtil from "../utils/seo.js";

export default {
	name: "Landing",
	head(){
		return SeoUtil.formulateSeo({
			title: this.user?.name,
			description: this.user?.bio,
			image: this.user?.image?.src || window.location.origin + "/images/contact.jpg"
		});
	},
	computed: {
		...mapGetters({
			user: "user/getUser"
		})
	}
};
</script>

<style scoped>
#start-page {
	height: 100vh;
	background-size:cover;
	background-color: #cccccc;
	background-repeat: no-repeat;
	background-image: url('/images/placeholder.webp');

	padding: 30vh 5vw;
}
</style>
