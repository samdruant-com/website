<script setup lang="ts">
import WorkCard from "~/components/cards/WorkCard.vue";
import { useProjectStore } from "~/stores/project-store";
import type { Work } from "~/types";

useSeoMeta({
	title: "Projects - Sam Druant",
	description:
		"Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.",
	ogImage: "/images/web-contact.jpg", // TODO: change this to a project image
	ogImageAlt: "Sam tufting in her studio",
});

const route = useRoute();
const projectStore = useProjectStore();

const work = ref<Work>();

onMounted(async () => {
	const workId = route.params.work;

	if (!workId) {
		throw new Error("No work id provided");
	}

	work.value = await projectStore.getWork(workId as string);

	if (work.value) {
		// update seo meta
		useSeoMeta({
			title: `${work.value.name} - Sam Druant`,
			description: `${work.value.material} (${work.value.size})`,
			ogImage: work.value.images[0]?.src,
		});
	}
});
</script>

<template>
	<base-page>
		<work-card v-if="work" :work="work" />
	</base-page>
</template>
