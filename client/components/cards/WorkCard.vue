<script setup lang="ts">
import type { Work, Image } from "~/types";
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

const getWorkThumbnail = (work: Work): Image => {
	return work.images[0];
};
</script>

<template>
	<base-card>
		<span v-if="!props.hideDetails">
			<h1>
				{{ props.work.name
				}}<span v-if="props.work.size">, {{ props.work.size }}</span>
			</h1>
			<h3 v-if="props.work.date">{{ props.work.date }}</h3>
			<p v-if="props.work.material">{{ props.work.material }}</p>
		</span>

		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<nuxt-link :to="`/works/${props.work.slug}`">
					<image-card
						:image="getWorkThumbnail(props.work)"
						:hide-details="props.hideDetails"
					/>
				</nuxt-link>
			</v-col>
		</v-row>
	</base-card>
</template>
