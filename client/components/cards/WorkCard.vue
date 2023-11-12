<script setup lang="ts">
import type { Work } from "~/types";
import ImageCard from "./ImageCard.vue";

const props = defineProps({
	work: {
		type: Object as PropType<Work>,
		required: true,
	},
	hideDetails: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<base-card>
		<span v-if="!props.hideDetails">
			<h1>{{ props.work.name }}</h1>
			<h3>{{ props.work.date }}</h3>
			<p>{{ `${props.work.material} (${props.work.size})` }}</p>
		</span>

		<v-row justify="center">
			<v-col
				v-for="image in props.work.images"
				:key="image._id"
				cols="12"
				class="text-center"
			>
				<image-card :image="image" :hide-details="props.hideDetails" />
			</v-col>
		</v-row>
	</base-card>
</template>
