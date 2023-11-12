<script setup lang="ts">
import type { Project, Image } from "~/types";

const props = defineProps({
	project: {
		type: Object as PropType<Project>,
		required: true,
	},
});
</script>

<template>
	<base-card>
		<h2>{{ props.project.name }}, {{ props.project.date }}</h2>
		<v-row>
			<v-col v-for="work in props.project.works" :key="work._id" cols="12">
				<work-card :work="work" hideDetails />
			</v-col>
		</v-row>
	</base-card>
</template>
