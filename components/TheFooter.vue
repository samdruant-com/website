<template>
	<v-footer
		app
		color="transparent">
		<v-row
			justify="end"
			align="center">
			<v-col cols="auto">
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.instagram.com/samdruant">
					<base-image
						src="/images/icons/instagram.webp"
						:height="15"
						size="contain" />
				</a>
			</v-col>
			<v-col cols="auto">
				<a
					class="hide-link"
					target="_blank"
					rel="noreferrer"
					href="https://olivermanzi.com">
					🤠
				</a>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
import BaseImage from "./base/BaseImage.vue";
export default {
	name: "Footer",
	components: { BaseImage }
};
</script>
