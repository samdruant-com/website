<template>
	<base-page :title="projectName">
		<v-row justify="center">
			<v-col
				v-for="work in projectWorks"
				:key="work._id"
				cols="12"
				class="text-center">
				<nuxt-link :to="`/projects/${$route.params.project}/${work._id}`">
					<base-image
						:src="getImage(work)"
						size="contain"
						height="auto"
						:width="isScreenMobile ? 300 : 700" />
				</nuxt-link>
				<b>{{ work.name }}</b>,
				{{ `${work.date} ${getPhotographer(work)}` }}
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import BasePage from "~/components/base/BasePage.vue";
import BaseImage from "~/components/base/BaseImage.vue";
export default {
	components: { BasePage, BaseImage },
	data(){
		return {
			project: null
		};
	},
	computed: {
		_project(){
			return this.$route.params.project;
		},
		projectName(){
			return this.project ? this.project.name : "Project Name";
		},
		projectWorks(){
			return this.project ? this.project.works : [];
		}
	},
	watch: {
		_project(projectId){
			this.getProject(projectId);
		}
	},
	async mounted(){
		const projectId = this._project;
		await this.getProject(projectId);

	},
	methods: {
		async getProject(id){
			try {
				this.project = await this.$store.dispatch("projects/get", id);
			} catch (error) {
				this.$store.commit("app/error/addError", error);
			}
		},
		getImage(work){
			if(!work || work.images.length === 0) return require("@/assets/images/icons/instagram.webp");
			else return require(`@/assets/images/${work.images[0].src}`);
		},
		getPhotographer(work){
			if(!work || work.images.length === 0) return null;
			else if(work.images[0].photographer.trim().length === 0) return "";
			else return `(Photographed by ${work.images[0].photographer})`;
		}
	}
};
</script>
