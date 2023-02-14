<template>
	<v-img
		v-if="lazy"
		:src="src"
		:lazy-src="src"
		:alt="alt"
		:height="height"
		:width="width"
		:max-height="maxHeight"
		:max-width="maxWidth"
		:aspect-ratio="aspectRatio"
		:style="getStyle" />
	<img
		v-else
		:src="src"
		:width="width"
		:height="height"
		:style="getStyle">
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: "/images/feedback_error.png"
		},
		alt: {
			type: String,
			default: "image"
		},
		width: {
			type: [Number, String],
			default: "auto"
		},
		height: {
			type: [Number, String],
			default: "100%"
		},
		maxHeight: {
			type: [String, Number],
			default: undefined
		},
		maxWidth: {
			type: [String, Number],
			default: undefined
		},
		aspectRatio: {
			type: [String, Number],
			default: undefined
		},
		size: {
			type: String,
			default: undefined
		},
		crop: {
			type: Boolean,
			default: false
		},
		scaleDown: {
			type: Boolean,
			default: false
		},
		lazy: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getStyle() {
			let width = this.width;
			let height = this.height;
			let objectFit = "cover";

			if (this.crop) {
				height = this.height === "auto" ? "200px" : this.height;
				width = this.width === "100%" ? "100%" : this.width;
			}

			if (this.scaleDown) {
				objectFit = "scale-down;";
			}

			return ` width: ${width}; height: ${height}; object-fit: ${objectFit};`;
		}
	}
};
</script>
