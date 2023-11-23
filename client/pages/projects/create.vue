<script setup lang="ts">
import type { Project } from "~/types";
const router = useRouter();
</script>

<template>
	<base-page>
		<project-form
			@created="(project: Project) => router.push(`/projects/${project.slug}`)"
		/>
	</base-page>
</template>
