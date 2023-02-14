<template>
	<base-page>
		<v-row justify="center">
			<v-col
				cols="12"
				md="8">
				<work-form
					@created="goToWorks()"
					@updated="goToWorks()" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
import WorkForm from "~/components/work/WorkForm.vue";
export default {
	components: { BasePage, WorkForm },
	methods: {
		goToWorks() {
			this.$router.push("/works");
		}
	}
};
</script>
