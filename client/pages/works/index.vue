<script setup lang="ts">
import { useWorkStore } from "~/stores/work-store";
import type { Work, Image } from "~/types";

const workStore = useWorkStore();

const works = ref<Work[]>([]);

const getThumbnail = (work: Work): Image | null => {
	if (work.images.length === 0) {
		return null;
	}

	return work.images[0];
};

onMounted(async () => {
	works.value = await workStore.indexWorks();
});
</script>

<template>
	<base-page title="Works">
		<v-row justify="center">
			<v-col v-for="work in works" cols="11" md="8">
				<nuxt-link class="plain text-center" :to="`/works/${work.slug}`">
					<h2>{{ work.name }} {{ work.date ? `, ${work.date}` : "" }}</h2>
					<base-image
						v-if="getThumbnail(work)"
						:src="getThumbnail(work)!.src"
						width="100%"
						height="auto"
					/>
				</nuxt-link>

				<base-btn class="mt-2" block :to="`/works/${work.slug}/edit`">
					Update
				</base-btn>
			</v-col>
		</v-row>
	</base-page>
</template>
