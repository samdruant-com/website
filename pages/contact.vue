<template>
	<base-page>
		<div id="contact">
			<v-row justify="center">
				<v-col cols="auto">
					<a
						class="hide-link"
						href="mailto: sam.druant@gmail.com"><b>email</b> me</a>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-col cols="auto">
					<a
						class="hide-link"
						href="mailto: sam.druant@gmail.com"><b>visit</b> my instagram</a>
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
	padding: 50% 0;
}
</style>
