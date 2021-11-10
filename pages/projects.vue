<template>
	<base-page>
		<v-row
			justify="center"
			justify-sm="space-between"
			align="start">
			<v-col
				cols="12"
				md="3"
				order="2"
				order-md="1">
				<v-list>
					<v-list-item
						v-for="project in projects"
						:key="project._id"
						@click="setCurrentProject(project)">
						<b v-if="selectedProject && project._id === selectedProject._id">{{ `${project.name}, ${project.date}` }}</b>
						<span v-else>{{ `${project.name}, ${project.date}` }}</span>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col
				cols="12"
				md="8"
				order="1"
				order-md="2"
				class="text-center">
				<nuxt-child />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BasePage from "~/components/base/BasePage.vue";

export default {
	components: { BasePage },
	data(){
		return {
			selectedProject: null,
			selectedProjectImage: null
		};
	},
	computed:{
		...mapGetters({
			projects: "projects/getProjects"
		})
	},
	async mounted(){
		try {
			await this.$store.dispatch("projects/index");
		} catch (error) {
			this.$store.commit("app/error/addError", error);
		}

		if(this.projects.length > 0){
			const project = this.projects[0];
			await this.setCurrentProject(project);
		}
	},
	methods: {
		async setCurrentProject(project){
			this.selectedProject = project;
			this.$router.push(`/projects/${this.selectedProject._id}`);
		}
	}
};
</script>
