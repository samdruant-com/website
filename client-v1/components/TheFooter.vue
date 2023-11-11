<template>
	<v-footer
		app
		color="transparent">
		<v-row
			class="mt-2 mt-md-1 pt-2 pt-md-1"
			justify="center"
			justify-md="end"
			align="center">
			<v-col
				class="text-center"
				cols="6"
				md="auto">
				<a
					class="hide-link"
					target="_blank"
					rel="noreferrer"
					href="https://www.instagram.com/samdruant">
					Instagram
				</a>
			</v-col>
			<v-col
				class="text-center"
				cols="6"
				md="auto">
				<nuxt-link
					class="hide-link"
					to="/contact">
					Contact
				</nuxt-link>
			</v-col>
			<v-spacer />
			<v-col
				class="text-center"
				cols="12"
				md="auto">
				Built by
				<a
					class="hide-link"
					target="_blank"
					rel="noreferrer"
					href="https://www.oliverrr.net">
					<b>oliverrr 🤠</b>
				</a>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	name: "Footer"
};
</script>
