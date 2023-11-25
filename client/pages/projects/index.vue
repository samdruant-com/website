<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";
import { useProjectStore } from "~/stores/project-store";
import type { Project } from "~/types";

useSeoMeta({
	title: "Projects - Sam Druant",
	description:
		"Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.",
	ogImage: "/images/web-contact.jpg", // TODO: change this to a project image
	ogImageAlt: "Sam tufting in her studio",
});

const authStore = useAuthStore();
const projectStore = useProjectStore();
const projects = ref<Project[]>([]);

onMounted(async () => {
	projects.value = await projectStore.indexProjects();
});
</script>

<template>
	<base-page>
		<v-row justify="center" justify-sm="space-between" align="start">
			<v-col v-for="project in projects" :key="project._id" cols="12" md="5">
        <project-card :project="project" :admin="authStore.isAuthenticated" />
			</v-col>
		</v-row>
	</base-page>
</template>
