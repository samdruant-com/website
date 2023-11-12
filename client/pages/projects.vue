<script setup lang="ts">
import { useProjectStore } from "~/stores/project-store";
import type { Project } from "~/types";

useSeoMeta({
	title: "Projects - Sam Druant",
	description:
		"Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.",
	ogImage: "/images/web-contact.jpg", // TODO: change this to a project image
	ogImageAlt: "Sam tufting in her studio",
});

const router = useRouter();
const projectStore = useProjectStore();

const currentProject = ref<Project | null>(null);

function setCurrentProject(project: Project) {
	currentProject.value = project;
	router.push(`/projects/${currentProject.value._id}`);
}

onMounted(async () => {
	await projectStore.indexProjects();

	if (projectStore.projects.length > 0) {
		const project = projectStore.projects[0];
		setCurrentProject(project);
	}
});
</script>

<template>
	<base-page>
		<v-row justify="center" justify-sm="space-between" align="start">
			<v-col cols="12" md="3" order="2" order-md="1">
				<v-list>
					<v-list-item
						v-for="project in projectStore.projects"
						:key="project._id"
						:ripple="false"
						@click="setCurrentProject(project)"
					>
						<b v-if="currentProject && project._id === currentProject._id">{{
							`${project.name}, ${project.date}`
						}}</b>
						<span v-else>{{ `${project.name}, ${project.date}` }}</span>
					</v-list-item>
				</v-list>
			</v-col>

			<v-col cols="12" md="8" order="1" order-md="2" class="text-center">
				<NuxtPage />
			</v-col>
		</v-row>
	</base-page>
</template>
