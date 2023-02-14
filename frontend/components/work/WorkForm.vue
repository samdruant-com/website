<template>
	<base-form
		:edit-mode="editMode"
		:disable-create="!isValid"
		:disable-update="!isValid"
		@created="postWork()"
		@updated="updateWork()"
		@deleted="deleteWork()">
		<v-row justify="center">
			<v-col
				cols="12"
				md="6">
				<v-divider class="mt-2" />
				Name
				<input-text
					v-model="form.name"
					place-holder="Name of work" />
			</v-col>
			<v-col
				cols="12"
				md="6">
				<v-divider class="mt-2" />
				Date
				<input-text
					v-model="form.date"
					place-holder="Date of work" />
			</v-col>
			<v-col cols="12">
				<v-divider class="mt-2" />
				Description
				<input-text
					v-model="form.description"
					place-holder="Description of work" />
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<v-divider class="mt-2" />
				Images
				<input-file
					prompt="Add new image"
					class="mt-2"
					@input="handleNewImages" />
			</v-col>
			<v-col
				v-for="image in form.images"
				:key="image._id"
				cols="12"
				md="4">
				<work-image
					:image="image"
					:dense="true"
					:edit-mode="true"
					:project-length="form.images.length"
					class="image-card"
					@updated="updateImageOrder"
					@deleted="removeImage" />
			</v-col>
		</v-row>
	</base-form>
</template>

<script>
import BaseForm from "~/components/base/BaseForm.vue";
import InputFile from "../base/InputFile.vue";
import InputText from "../base/InputText.vue";
import WorkImage from "./WorkImage.vue";

/**
 * Returns true if a work attribute is empty
 */
function isEmptyWork(work) {
	function isEmpty (value) {
		return value === null || value === "";
	}

	return (
		isEmpty(work.name) ||
		isEmpty(work.date) ||
		isEmpty(work.description) ||
		work.images.length === 0
	);
}

/**
 * Returns a form data object with the work and files
 *
 * @param {object} work
 * @returns {FormData} form
 */
function formulateWork(work) {
	const form = new FormData();

	form.append("name", work.name);
	form.append("date", work.date);
	form.append("description", work.description);

	work.images = work.images.map((image) => {
		// if image has no file, return image
		if(image.file === null || image.file === undefined) return image;

		// create blob from file
		const blob = new Blob([image.file], { type: image.file.type });
		// append file to form
		form.append("files", blob, image.file.name);
		// set image file to file name
		image.fileName = image.file.name;
		// delete file from image
		delete image.file;

		return image;
	});

	form.append("images", JSON.stringify(work.images));

	return form;
}

export default {
	components: { BaseForm, WorkImage, InputFile, InputText },
	props: {
		work: {
			type: Object,
			default: null
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	emits: ["created", "updated", "deleted"],
	data() {
		return {
			form: {
				name: null,
				date: null,
				description: null,
				images: []
			}
		};
	},
	computed: {
		isValid(){
			return !isEmptyWork(this.form);
		}
	},
	created() {
		if(this.editMode === true && this.work){
			// setup form
			this.form = { ...this.work };
			// sort images by order
			this.form.images = this.sortImagesByOrder(this.form.images);
		}
	},
	methods:{
		async postWork(){
			try {
				const formData = formulateWork(this.form);
				const work = await this.$store.dispatch("works/post", formData);

				if(work){
					this.$emit("created", work);
				}

			} catch (error) {
				this.$store.commit("app/notifications/notifyError", error.message);
			}

		},
		async updateWork(){
			try {
				const formData = formulateWork(this.form);
				const work = await this.$store.dispatch("works/patch", { id: this.work._id, patch: formData });

				if(work){
					this.$emit("updated", work);
				}
			} catch (error) {
				this.$store.commit("app/notifications/notifyError", error.message);
			}
		},
		async deleteWork(){
			try {
				const work = await this.$store.dispatch("works/delete", this.work._id);

				if(work){
					this.$emit("deleted", work);
				}
			} catch (error) {
				this.$store.commit("app/notifications/notifyError", error.message);
			}
		},
		handleNewImages(files) {
			if(files.length){
				// convert files to images and append to form.images
				files.forEach((file) => {
					const image = {
						file,
						order: this.form.images.length + 1,
						src: URL.createObjectURL(file)
					};

					this.form.images.push(image);
				});
			}
		},
		updateImageOrder({ image, order }) {
			const images = this.form.images.slice();
			const indexFrom = images.findIndex((img) => img.order === image.order);
			const indexTo = images.findIndex((img) => img.order === order);

			if (indexFrom < indexTo) {
				// decrement order of all images after index and before order
				for (let i = indexFrom + 1; i <= indexTo && i < images.length; i++) {
					images[i].order--;
				}
			} else if (indexFrom > indexTo) {
				// increment order of all images after order and before index
				for (let i = indexFrom; i >= indexTo && i >= 0; i--) {
					images[i].order++;
				}
			}

			// update image order
			images[indexFrom].order = order;

			// sort images by order
			this.form.images = this.sortImagesByOrder(images);
		},
		removeImage(image) {
			// remove image from form.images by order
			this.form.images = this.form.images.filter(
				(img) => img.order !== image.order
			);
			// update order of remaining images by decrementing order by 1
			this.form.images.forEach((img) => {
				if (img.order > image.order) {
					img.order--;
				}
			});
		},
		sortImagesByOrder(images) {
			return images.sort((a, b) => a.order - b.order);
		}
	}
};
</script>
