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

const route = useRoute();
const projectStore = useProjectStore();

const project = ref<Project>();

const getProject = async (projectId: string) => {
	project.value = await projectStore.getProject(projectId);

	if (project.value) {
		// update seo meta
		useSeoMeta({
			title: `${project.value.name} - Sam Druant`,
			ogImage: project.value.works[0].images[0]?.src,
		});
	}

	return project.value;
};

watch(
	() => route.params.project,
	async (projectId) => {
		if (!projectId) {
			throw new Error("No project id provided");
		}

		project.value = await getProject(projectId as string);
	}
);

onMounted(async () => {
	const projectId = route.params.project;

	if (!projectId) {
		throw new Error("No project id provided");
	}

	project.value = await getProject(projectId as string);
});
</script>

<template>
	<base-page :title="project?.name">
		<project-card v-if="project" :project="project" />
	</base-page>
</template>
