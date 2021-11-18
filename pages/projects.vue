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
						:ripple="false"
						@click="setCurrentProject(project)">
						<b v-if="currentProject && project._id === currentProject._id">{{ `${project.name}, ${project.date}` }}</b>
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

// meta text
const metaTitle = "Projects - Sam Druant";
const metaDescription = "Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.";

export default {
	components: { BasePage },
	data(){
		return {
			currentProject: null,
			metaImage: null
		};
	},
	head() {
		return {
			title: metaTitle,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: "description",
					name: "description",
					content: metaDescription
				},
				// og meta tags
				{
					hid: "og:url",
					property: "og:type",
					content: window.location.origin + this.$route.path
				},
				{
					hid: "og:type",
					property: "og:type",
					content: "website"
				},
				{
					hid: "og:title",
					property: "og:title",
					content: metaTitle
				},
				{
					hid: "og:description",
					property: "og:description",
					content: metaDescription
				},
				{
					hid: "og:image",
					property: "og:image",
					content: window.location.origin + this.metaImage
				}
			]
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

			if(project.works.length > 0){
				const image = await this.$store.dispatch("projects/images/get", project.works[0]._id);
				this.metaImage = image ? `/images/${image.src}` : null;
			}
		}
	},
	methods: {
		async setCurrentProject(project){
			this.currentProject = project;
			this.$router.push(`/projects/${this.currentProject._id}`);
		}
	}
};
</script>
