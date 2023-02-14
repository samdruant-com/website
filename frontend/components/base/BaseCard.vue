<template>
	<v-card
		:color="color"
		:elevation="elevation"
		:outlined="outlined"
		class="pa-1 pa-md-2">
		<slot />
		<v-row
			v-if="showOptions"
			justify="end"
			class="mt-1">
			<v-col
				v-for="option in options"
				:key="option.label"
				cols="auto"
				class="mx-1">
				<base-btn
					:small="true"
					:rounded="true"
					:color="option.color"
					@click="option.action">
					{{ option.label }}
				</base-btn>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import BaseBtn from "./BaseBtn.vue";
export default {
	components: { BaseBtn },
	props: {
		color: {
			type: String,
			default: "transparent"
		},
		elevation: {
			type: [String, Number],
			default: 0
		},
		outlined: {
			type: Boolean,
			default: false
		},
		showOptions: {
			type: Boolean,
			default: false
		}
	},
	emits: ["edit", "delete"],
	computed: {
		options(){
			return [
				{label: "Edit", color: "primary", action: () => this.$emit("edit")},
				{label: "Delete", color: "error", action: () => this.$emit("delete")}
			];
		}
	}
};
</script>
