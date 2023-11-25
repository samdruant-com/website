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
	return getImageDetail(props.image);
});

const getImageDetail = (image: Image): string => {
	const { place, photographer } = image;

	let detail = "";

	if (place && photographer) {
		detail = `Photographed by ${photographer} at ${place}`;
	} else if (place) {
		detail = `Displayed at ${place}`;
	} else if (photographer) {
		detail = `Photographed by ${photographer}`;
	}

	return detail;
};
</script>

<template>
	<base-card>
		<base-image
			:src="props.image.src"
      :height="smAndDown ? 'auto' : 500"
      :width="smAndDown ? '100%' : 'auto'"
		/>

		<small v-if="!props.hideDetails">{{ details }}</small>
	</base-card>
</template>
