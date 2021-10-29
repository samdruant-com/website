<template>
	<base-page>
		<div id="contact">
			<v-row
				justify="end"
				class="mr-2 mr-md-5">
				<v-col cols="auto">
					<a
						class="hide-link"
						href="mailto:sam.druant@gmail.com"><b>email</b> me</a>
				</v-col>
			</v-row>
			<v-row
				justify="end"
				class="mr-2 mr-md-5">
				<v-col cols="auto">
					<a
						class="hide-link"
						target="_blank"
						rel="noreferrer"
						href="https://www.instagram.com/samdruant"><b>visit</b> my instagram</a>
				</v-col>
			</v-row>
		</div>
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
export default {
	name: "Contact",
	components: { BasePage }
};
</script>

<style scoped>
#contact {
	margin-top: 15%;
}

@media screen and (max-width: 480px) {
  /* add styling for mobile screens here */
	#contact {
		margin-top: 50%;
	}
}
</style>
