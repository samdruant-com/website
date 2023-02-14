<template>
	<base-page>
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
					to="/works/create">
					New Work
				</base-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col
				v-if="works?.length === 0"
				cols="12"
				class="error-text">
				<h2 class="text-center">
					No works yet
				</h2>
			</v-col>
			<v-col
				v-for="work in works"
				:key="work._id"
				cols="12"
				md="4">
				<work-card
					:work="work"
					:edit-mode="isLoggedIn"
					@update="editWork"
					@delete="deleteWork" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BaseBtn from "~/components/base/BaseBtn.vue";
import BasePage from "~/components/base/BasePage.vue";
import WorkCard from "~/components/work/WorkCard.vue";
import SeoUtil from "~/utils/seo.js";
export default {
	components: { BasePage, WorkCard, BaseBtn },
	head(){
		return SeoUtil.formulateSeo({
			title: "Works",
			description: "My works",
			image: this.getHeaderImage
		});
	},
	computed: {
		...mapGetters({
			user: "user/getUser",
			works: "works/getWorks",
			isLoggedIn: "auth/isLoggedIn"
		}),
		getHeaderImage(){
			// get the first work
			const work = this.works[0];
			// if there is no work, return null
			if(!work) return null;
			// return the first image of the first work
			return work?.images[0]?.src;
		}
	},
	async created(){
		await this.$store.dispatch("works/index");

		if(process.client){
			// eslint-disable-next-line nuxt/no-globals-in-created
			window.addEventListener("scroll", this.handleScroll);
		}
	},
	methods: {
		editWork(work){
			this.$router.push(`/works/${work._id}/edit`);
		},
		async deleteWork(work){
			await this.$store.dispatch("works/delete", work._id);
			await this.$store.dispatch("works/index");
		},
		handleScroll(){
			const innerHeight = window.innerHeight;
			const scrollY = window.scrollY;
			const bodyHeight = document.body.offsetHeight;

			if (innerHeight + scrollY >= bodyHeight) {
				this.$store.dispatch("works/index");
			}
		}
	}
};
</script>
