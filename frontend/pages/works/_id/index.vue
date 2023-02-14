<template>
	<base-page>
		<v-row
			v-if="isLoggedIn === true && work"
			no-gutters
			justify="center">
			<v-col
				cols="12"
				md="auto">
				<base-btn
					rounded
					color="primary"
					:to="`/works/${work._id}/edit`">
					Edit Work
				</base-btn>
			</v-col>
		</v-row>

		<v-row
			v-if="work"
			justify="center">
			<v-col cols="12">
				<h2>{{ work.name }}, <small>{{ work.date }}</small></h2>
				<p>{{ work.description }}</p>
			</v-col>
			<v-col
				v-for="image in work.images"
				:key="image._id"
				cols="12"
				md="8">
				<base-image
					:src="image.src"
					:lazy="true"
					:alt="work.name" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BaseImage from "~/components/base/BaseImage.vue";
import BasePage from "~/components/base/BasePage.vue";
import SeoUtil from "~/utils/seo.js";

export default {
	components: { BasePage, BaseImage },
	data(){
		return {
			work: null
		};
	},
	head(){
		const work = this.work?.name || "Work";
		const user = this.user?.name || "Me";

		return SeoUtil.formulateSeo({
			title: `${work} by ${user}`,
			description: this.work?.description || "See my work",
			image: this.work?.images[0]?.src
		});
	},
	computed: {
		...mapGetters({
			user: "user/getUser"
		})
	},
	async created(){
		const id = this.$route.params.id;
		this.work = await this.$store.dispatch("works/get", id);
	}
};
</script>
