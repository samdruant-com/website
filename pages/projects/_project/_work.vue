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
	computed: {
		workName(){
			return this.work ? this.work.name : "work";
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
			if(!image) return require("@/assets/images/icons/instagram.webp");
			else if(!image.src) return require("@/assets/images/icons/instagram.webp");
			else return require(`@/assets/images/${image.src}`);
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
