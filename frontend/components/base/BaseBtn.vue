<template>
	<v-btn
		:block="block"
		:color="color"
		:disabled="disabled"
		:elevation="elevation"
		:large="large"
		:outlined="outlined"
		:small="small"
		:text="text"
		:tile="tile"
		:to="to"
		:class="btnClass"
		@click="emitClick()">
		<slot />
	</v-btn>
</template>

<script>
export default {
	props: {
		block: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: undefined
		},
		disabled: {
			type: Boolean,
			default: false
		},
		elevation: {
			type: [String, Number],
			default: 0
		},
		large: {
			type: Boolean,
			default: false
		},
		outlined: {
			type: Boolean,
			default: false
		},
		rounded: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		},
		text: {
			type: Boolean,
			default: undefined
		},
		tile: {
			type: Boolean,
			default: true
		},
		to: {
			type: String,
			default: undefined
		}
	},
	emits: ["click"],
	computed: {
		btnClass() {
			let btnClass = "";

			if (this.rounded) {
				btnClass = btnClass + " rounded-lg";
			}

			return btnClass;
		}
	},
	methods: {
		emitClick() {
			this.$emit("click");
		}
	}
};
</script>
