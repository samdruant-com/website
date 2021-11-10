<template>
	<div>
		<img
			:src="src"
			:class="style"
			:width="width"
			:height="height">
	</div>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			required: true
		},
		alt: {
			type: String,
			default: "image"
		},
		width: {
			type: [Number, String],
			default: undefined
		},
		height: {
			type: [Number, String],
			default: undefined
		},
		size: {
			type: String,
			default: undefined
		}
	},
	computed: {
		style(){
			switch (this.size) {
			case "fill":
				return "img-fill";
			case "contain":
				return "img-contain";
			case "cover":
				return "img-cover";
			case "scale-down":
				return "img-scale-down";
			default:
				return "img-none";
			}
		}
	}
};
</script>

<style scoped>
/*object-fit: fill || contain || cover || none || scale-down;*/

.img-fill {
	object-fit: fill;
}
.img-contain {
	object-fit: contain;
}
.img-cover {
	object-fit: cover;
}
.img-scale-down {
	object-fit: scale-down;
}
.img-none {
	object-fit: none;
}
</style>
