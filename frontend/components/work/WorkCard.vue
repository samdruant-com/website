<template>
	<base-card
		:show-options="editMode"
		:color="editMode ? 'grey lighten-4' : ''"
		class="rounded-lg"
		@edit="updateWork()"
		@delete="deleteWork()">
		<nuxt-link :to="`/works/${getWorkId}`">
			<base-image
				:src="getImage"
				:lazy="true"
				:alt="work.name"
				max-height="650px" />
		</nuxt-link>

		<v-row
			no-gutters
			class="mt-2">
			<v-col
				cols="12"
				md="6">
				<span>
					<b>{{ work.name }}</b>, {{ work.date }}
				</span>
			</v-col>
			<v-col cols="12">
				<p>
					{{ work.description }}
				</p>
			</v-col>
		</v-row>
	</base-card>
</template>

<script>
import BaseCard from "~/components/base/BaseCard.vue";
import BaseImage from "../base/BaseImage.vue";

export default {
	components: { BaseCard, BaseImage },
	props: {
		work: {
			type: Object,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update", "delete"],
	computed: {
		getImage(){
			const images = [...this.work.images];

			// sort images by order (lowest to highest)
			const sortedImages = images.sort((a, b) => a.order - b.order);

			return sortedImages[0].src || null;
		},
		getWorkId(){
			return this.work.slug && this.work.slug.length > 0 ? this.work.slug : this.work._id;
		}
	},
	methods:{
		updateWork(){
			this.$emit("update", this.work);
		},
		deleteWork(){
			this.$emit("delete", this.work);
		}
	}
};
</script>
