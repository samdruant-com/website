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

// meta text
const metaTitle = "Contact - Sam Druant";
const metaDescription = "Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.";

export default {
	name: "Contact",
	components: { BasePage, BaseImage },
	head() {
		return {
			title: metaTitle,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: "description",
					name: "description",
					content: metaDescription
				},
				// og meta tags
				{
					hid: "og:url",
					property: "og:type",
					content: window.location.origin + this.$route.path
				},
				{
					hid: "og:type",
					property: "og:type",
					content: "website"
				},
				{
					hid: "og:title",
					property: "og:title",
					content: metaTitle
				},
				{
					hid: "og:description",
					property: "og:description",
					content: metaDescription
				},
				{
					hid: "og:image",
					property: "og:image",
					content: window.location.origin + "/images/web-contact.jpg"
				}
			]
		};
	}
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
