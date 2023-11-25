<script setup lang="ts">
import type { Work } from "~/types";

definePageMeta({ middleware: ['auth'] });

const route = useRoute();
const router = useRouter();
const workStore = useWorkStore();
const { notify } = useNotification();

const work = ref<Work>();

onMounted(async () => {
	const id = route.params.work;

	try {
		if (!id) {
			throw new Error("Missing work id");
		}

		work.value = await workStore.getWork(id as string);
	} catch (error) {
		notify("Edit Error", (error as Error).message, "error");
	}
});
</script>

<template>
	<BasePage>
		<WorkForm
			v-if="work"
			:work="work"
			edit-mode
			@updated="router.push(`/works/${work.slug}`)"
		/>
	</BasePage>
</template>
