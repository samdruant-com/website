<template>
	<base-page>
		<div id="contact">
			<v-row
				v-if="isLoggedIn"
				no-gutters
				justify="center">
				<v-col
					cols="12"
					md="auto">
					<base-btn
						rounded
						color="primary"
						to="/contact/edit">
						Edit Contact Info
					</base-btn>
				</v-col>
			</v-row>

			<v-row
				v-if="user"
				justify="center"
				justify-md="space-around"
				align="center"
				class="mr-2 mr-md-5">
				<v-col
					cols="12"
					md="auto">
					<base-image
						:src="getContactImage"
						:width="isScreenMobile ? 300 : 400"
						max-height="500px"
						:lazy="true"
						size="contain" />
				</v-col>
				<v-col
					cols="12"
					md="auto">
					<p>
						<a
							class="hide-link"
							:href="`mailto:${user.email}`"><b>email</b> me</a>
					</p>
					<p
						v-for="link in user.links"
						:key="link.url">
						<a
							class="hide-link"
							target="_blank"
							rel="noreferrer"
							:href="link.url">
							<b>visit</b> my {{ link.label }}
						</a>
					</p>
				</v-col>
			</v-row>
		</div>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BaseBtn from "~/components/base/BaseBtn.vue";
import BaseImage from "~/components/base/BaseImage.vue";
import BasePage from "~/components/base/BasePage.vue";
import SeoUtil from "~/utils/seo.js";

export default {
	name: "Contact",
	components: { BasePage, BaseImage, BaseBtn },
	head() {
		return SeoUtil.formulateSeo({
			title: `${this.user?.name}'s contact` || "Contact Me",
			description: this.user?.bio || "Contact Me",
			image: this.user?.image?.src || window.location.origin + "/images/contact.jpg"
		});
	},
	computed: {
		...mapGetters({
			user: "user/getUser"
		}),
		getContactImage() {
			return this.user?.image?.src || "/images/contact.jpg";
		}
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
