<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";
import { useWorkStore } from "~/stores/work-store";
import type { Work, Image } from "~/types";

const authStore = useAuthStore();
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
        <work-card :work="work" :admin="authStore.isAuthenticated" />
			</v-col>
		</v-row>
	</base-page>
</template>
