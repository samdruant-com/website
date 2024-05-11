<script setup lang="ts">
import type { Image, Work } from "~/types";

const props = defineProps({
	work: {
		type: Object as PropType<Work>,
	},
});

const emit = defineEmits(["created", "updated", "deleted"]);

const workStore = useWorkStore();
const { notify } = useNotification();

const form = reactive<Partial<Work>>({
	name: props.work?.name || "",
	date: props.work?.date || "",
	size: props.work?.size || "",
	material: props.work?.material || "",
	images: [...(props.work?.images || [])],
	visible: props.work?.visible || true,
});

const newImages = ref<Image[]>([]);

const validForm = computed<boolean>(() => {
	return (
		form.name !== "" &&
		form.date !== "" &&
		(form.images?.length !== 0 || newImages.value.length !== 0)
	);
});

const getImages = computed<Image[]>(() => {
	const images = [...(form.images || []), ...newImages.value];

	return images.sort((a, b) => a.order - b.order);
});

const isNewImage = (image: Image): boolean => {
	return image.file !== undefined;
};

const getFilePath = (file: File): string => {
	return URL.createObjectURL(file);
};

const handleNewFiles = (files: File[]): void => {
	const imageCount = form.images?.length || 0;

	// convert files to images
	const processedFiles: Image[] = files.map((file, index) => ({
		_id: "",
		src: getFilePath(file),
		caption: "",
		file,
		order: imageCount + index + 1,
	}));

	// add file images to newImages array
	newImages.value.push(...processedFiles);
};

const removeImage = (image: Image, newImage: boolean): void => {
	if (newImage) {
		newImages.value = newImages.value.filter(
			(currentImage) => currentImage.file!.name !== image.file?.name
		);
	} else {
		form.images = form.images?.filter(
			(currentImage) => currentImage._id !== image._id
		);
	}
};

const postImage = async (): Promise<void> => {
	try {
		const work = await workStore.postWork({ ...form, images: newImages.value });
		emit("created", work);
	} catch (error) {
		notify("Work Error", (error as Error).message, "error");
	}
};

const updateImage = async (): Promise<void> => {
	try {
		if (!props.work) {
			throw new Error("Missing work id");
		}

		const work = await workStore.updateWork(props.work!._id, {
			...(form as Work),
			images: [...(form.images || []), ...newImages.value],
		});
		emit("updated", work);
	} catch (error) {
		notify("Work Error", (error as Error).message, "error");
	}
};

const deleteImage = async (): Promise<void> => {
	try {
		const work = await workStore.deleteWork(props.work!._id);
		emit("deleted", work);
	} catch (error) {
		notify("Work Error", (error as Error).message, "error");
	}
};
</script>

<template>
	<base-card>
		<input-text v-model="form.name" label="name" />
		<input-text v-model="form.size" label="size" />
		<input-text v-model="form.material" label="material" />
		<input-date-time v-model="form.date" label="date" hide-time />

		<label class="mt-2 flex flex-col">
			<span class="label-text">Visible</span>
			<div class="mt-2 flex justify-between">
				<span class="w-4/6 text-sm text-slate-700"
					>unchecked works are only visible by website admin</span
				>
				<input
					v-model="form.visible"
					type="checkbox"
					class="toggle toggle-success"
					checked
				/>
			</div>
		</label>

		<div class="flex flex-col gap-2 my-4 p-2 bg-slate-100">
			<input-file
				label="Images"
				multiple
				class="col-span-3"
				@update:model-value="handleNewFiles"
			/>

			<div class="w-full flex flex-col md:grid md:grid-cols-3 gap-2">
				<div
					v-for="image in getImages"
					:key="isNewImage(image) ? image.file!.name : image._id"
					class="flex flex-col gap-2"
				>
					<image-card
						:image="image"
						admin-mode
						@caption="(caption) => (image.caption = caption)"
					/>

					<input-text v-model="image.order" type="number" label="Order" />

					<base-btn
						class="bg-red-400"
						@click="removeImage(image, isNewImage(image))"
						>Remove</base-btn
					>
				</div>
			</div>
		</div>

		<div class="flex flex-row gap-2 pt-2" style="border-top: 3px solid">
			<base-btn v-if="!props.work" :disabled="!validForm" @click="postImage()"
				>Upload</base-btn
			>
			<base-btn v-if="props.work" :disabled="!validForm" @click="updateImage()"
				>Update</base-btn
			>
			<base-btn v-if="props.work" class="bg-red-400" @click="deleteImage()"
				>Delete</base-btn
			>
		</div>
	</base-card>
</template>
