<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { Image } from "~/types";

const props = defineProps({
	image: {
		type: Object as PropType<Image>,
		required: true,
	},
	hideDetails: {
		type: Boolean,
		default: false,
	},
});

const { smAndDown } = useDisplay();

const details = computed<string>(() => {
	const photographer = props.image.photographer
		? `Photographed by ${props.image.photographer},`
		: "";
	const place = props.image.place ? props.image.place : "";

	return `${photographer} ${place}`;
});
</script>

<template>
	<base-card>
		<base-image
			:src="props.image.src"
			size="contain"
			:width="smAndDown ? 300 : 700"
		/>

		<span v-if="!props.hideDetails">{{ details }}</span>
	</base-card>
</template>
