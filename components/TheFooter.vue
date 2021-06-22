<template>
	<b-row
		class="mx-2 my-2"
		align-h="center">
		<b-col cols="auto">
			<b-img
				height="15"
				src="~/assets/img/icons/instagram.png" />
				&nbsp;
			<a
				class="link"
				target="_blank"
				href="https://www.instagram.com/samdruant/">@samdruant</a>
		</b-col>
		<b-col cols="auto">
			<mail-icon />
			&nbsp;
			<a
				class="link"
				href="mailto: sam.druant@gmail.com">send email</a>
		</b-col>
	</b-row>
</template>

<script>
	import { BIconMailbox } from "bootstrap-vue";
	export default {
		name: "Footer",
		components: {
			"mail-icon" : BIconMailbox,
		}
	};
</script>

<style scoped>
#contact-container {
	margin: 1em 0.5em;
	display: grid;
	place-items: center;
}

.footer-icon{
	max-width: 5%;
	height: auto;
}
</style>
