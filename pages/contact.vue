<template>
	<base-page>
		<div id="contact">
			<v-row
				justify="center"
				justify-md="space-around"
				align="center"
				class="mr-2 mr-md-5">
				<v-col
					cols="12"
					md="auto">
					<base-image
						src="/images/web-contact.jpg"
						size="contain"
						:width="isScreenMobile ? 300 : 400" />
				</v-col>
				<v-col
					cols="12"
					md="auto">
					<p>
						<a
							class="hide-link"
							href="mailto:sam.druant@gmail.com"><b>email</b> me</a>
					</p>
					<p>
						<a
							class="hide-link"
							target="_blank"
							rel="noreferrer"
							href="https://www.instagram.com/samdruant"><b>visit</b> my instagram</a>
					</p>
				</v-col>
			</v-row>
		</div>
	</base-page>
</template>

<script>
import BaseImage from "~/components/base/BaseImage.vue";
import BasePage from "~/components/base/BasePage.vue";
export default {
	name: "Contact",
	components: { BasePage, BaseImage }
};
</script>

<style scoped>
#contact {
	margin-top: 5%;
}

@media screen and (max-width: 480px) {
  /* add styling for mobile screens here */
	#contact {
		margin-top: 10%;
	}
}
</style>
