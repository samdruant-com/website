<template>
	<base-page>
		<v-row justify="center">
			<v-col
				v-if="work"
				cols="12"
				md="8">
				<work-form
					:work="work"
					:edit-mode="true"
					@updated="goToWorks()"
					@deleted="goToWorks()" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
import WorkForm from "~/components/work/WorkForm.vue";
export default {
	components: { BasePage, WorkForm },
	data(){
		return {
			work: null
		};
	},
	async created(){
		const id = this.$route.params.id;
		this.work = await this.$store.dispatch("works/get", id);
	},
	methods: {
		async goToWorks() {
			await this.$store.dispatch("works/index");
			this.$router.push("/works");
		}
	}
};
</script>
