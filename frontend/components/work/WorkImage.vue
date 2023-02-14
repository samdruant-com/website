<template>
	<base-card
		:outlined="true"
		color="grey lighten-4"
		class="rounded-lg">
		<v-row
			v-if="editMode"
			no-gutters
			justify="space-between"
			class="ma-1">
			<v-col cols="auto">
				<v-menu offset-y>
					<template #activator="{ on, attrs }">
						<v-chip
							small
							v-bind="attrs"
							v-on="on">
							{{ image.order }}
						</v-chip>
					</template>
					<v-list v-if="orders.length">
						<v-list-item
							v-for="index in orders"
							:key="index"
							@click="updateImage(index)">
							<v-list-item-title>{{ index }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>

			<v-col cols="auto">
				<base-btn
					:rounded="true"
					:small="true"
					color="error"
					@click="deleteImage()">
					Delete
				</base-btn>
			</v-col>
		</v-row>
		<base-image
			v-if="image"
			:src="image.src"
			:alt="image.caption"
			:crop="true"
			:lazy="true"
			:height="dense ? '200px' : undefined"
			class="mt-1" />
	</base-card>
</template>

<script>
import BaseBtn from "~/components/base/BaseBtn.vue";
import BaseCard from "~/components/base/BaseCard.vue";
import BaseImage from "~/components/base/BaseImage.vue";
export default {
	components: { BaseCard, BaseBtn, BaseImage },
	props: {
		image: {
			type: Object,
			required: true
		},
		projectLength: {
			type: Number,
			default: 0
		},
		dense: {
			type: Boolean,
			default: false
		},
		order: {
			type: Number,
			default: 0
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	emits: ["updated", "deleted"],
	computed: {
		orders() {
			const orders = [];
			for (let i = 0; i < this.projectLength; i++) {
				orders.push(i + 1);
			}
			return orders.filter((order) => order !== this.image.order);
		}
	},
	methods: {
		updateImage(index){
			this.$emit("updated", { image: this.image, order: index });
		},
		deleteImage() {
			this.$emit("deleted", this.image);
		}
	}
};
</script>
