<script setup lang="ts">
import type { Project, Image } from "~/types";
import type { ActionItem } from "~/components/base/BaseCard.vue";

const props = defineProps({
	project: {
		type: Object as PropType<Project>,
		required: true,
	},
	admin: {
		type: Boolean,
		default: false,
	},
});

const options = computed<ActionItem[]>(() => {
	return props.admin
		? [
				{
					label: "Edit",
					size: "small",
					to: `/projects/${props.project.slug}/edit`,
				},
		  ]
		: [];
});

const getProjectThumbnail = (project: Project): Image => {
	return project.works[0]?.images[0];
};
</script>

<template>
	<base-card :actions="options">
		<image-card :image="getProjectThumbnail(props.project)" hide-details />
		<v-card-item>
			<h3>{{ props.project.name }}</h3>
		</v-card-item>
	</base-card>
</template>
