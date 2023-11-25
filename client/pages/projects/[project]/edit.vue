<script setup lang="ts">
import { useProjectStore } from "~/stores/project-store";
import type { Project } from "~/types";

definePageMeta({ middleware: ['auth'] });

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const { notify } = useNotification();

const project = ref<Project>();

onMounted(async () => {
	const id = route.params.project;

	try {
		if (!id) {
			throw new Error("Missing project id");
		}

		project.value = await projectStore.getProject(id as string);
	} catch (error) {
		notify("Project Error", (error as Error).message, "error");
	}
});
</script>

<template>
	<base-page>
		<project-form
			v-if="project"
			:project="project"
			@updated="router.push(`/projects/${project.slug}`)"
		/>
	</base-page>
</template>
