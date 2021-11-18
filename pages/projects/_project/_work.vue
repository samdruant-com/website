<template>
	<base-page>
		<template #title>
			<div class="text-center">
				<h1>{{ workName }}</h1>
				<h3>{{ workDate }}</h3>
				<p>{{ `${workMaterial} (${workSize})` }}</p>
			</div>
		</template>
		<v-row justify="center">
			<v-col
				v-for="image in workImages"
				:key="image._id"
				cols="12"
				class="text-center">
				<base-image
					:src="getSrc(image)"
					size="contain"
					:width="isScreenMobile ? 300 : 700" />

				<span v-if="getPhotographer(image)">Photographed by <b>{{ `${getPhotographer(image)}` }}</b></span>
				<span v-if="getPhotographer(image) && getPlace(image)">,</span>
				<span v-if="getPlace(image)">{{ getPlace(image) }}</span>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import BaseImage from "~/components/base/BaseImage.vue";
import BasePage from "~/components/base/BasePage.vue";
export default {
	components: { BasePage, BaseImage },
	data(){
		return {
			work: null
		};
	},
	head() {
		return {
			title: this.metaTitle,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: "description",
					name: "description",
					content: this.metaDescription
				},
				// hid for image in url
				{
					hid: "og:url",
					property: "og:type",
					content: window.location.origin + this.$route.path
				},
				{
					hid: "og:type",
					property: "og:type",
					content: "website"
				},
				{
					hid: "og:title",
					property: "og:title",
					content: this.metaTitle
				},
				{
					hid: "og:description",
					property: "og:description",
					content: this.metaDescription
				},
				{
					hid: "og:image",
					property: "og:image",
					content: this.workImages.length > 0 ? this.getSrc(this.workImages[0]) : null
				}
			]
		};
	},
	computed: {
		metaTitle(){
			return `${this.workName} - Sam Druant`;
		},
		metaDescription(){
			return this.workMaterial && this.workSize ? `${this.workMaterial} (${this.workSize})` : "Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.";
		},
		workName(){
			return this.work ? this.work.name : "A work by Sam";
		},
		workDate(){
			return this.work ? this.work.date : "date";
		},
		workSize(){
			return this.work ? this.work.size : "size";
		},
		workMaterial(){
			return this.work ? this.work.material : "material";
		},
		workImages(){
			return this.work ? this.work.images : [];
		}
	},
	async mounted(){
		try {
			const workId = this.$route.params.work;
			this.work = await this.$store.dispatch("projects/works/get", workId);
		} catch (error) {
			this.$store.commit("app/error/addError", error);
		}
	},
	methods: {
		getSrc(image){
			if(!image) return "/images/icons/instagram.webp";
			else if(!image.src) return "/images/icons/instagram.webp";
			else return `/images/${image.src}`;
		},
		getPhotographer(image){
			if(!image) return null;
			else if(!image.photographer) return null;
			else return image.photographer;
		},
		getPlace(image){
			if(!image) return null;
			else if(!image.place) return null;
			else return image.place;
		}
	}
};
</script>
