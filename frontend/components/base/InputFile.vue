<template>
	<div>
		<base-btn
			:color="color"
			:small="true"
			:rounded="true"
			:disabled="disabled"
			@click="handleFileImport()">
			{{ prompt }}
		</base-btn>

		<!-- Create a File Input that will be hidden but triggered with JavaScript -->
		<input
			ref="uploader"
			class="d-none"
			type="file"
			:multiple="true"
			@change="onFileChanged">
	</div>
</template>

<script>
import BaseBtn from "~/components/base/BaseBtn.vue";
export default {
	components: { BaseBtn },
	props: {
		color: {
			type: String,
			default: "primary"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		prompt: {
			type: String,
			default: "Upload"
		}
	},
	emits: ["input"],
	data() {
		return {
			files: []
		};
	},
	watch: {
		files(files, oldFiles) {
			if (files.length > 0 && files.length !== oldFiles.length) {
				this.$emit("input", files);
				this.files = [];
			}
		}
	},
	methods: {
		handleFileImport() {
			// Trigger click on the FileInput
			this.$refs.uploader.click();
		},
		onFileChanged(e) {
			this.files = Array.from(e.target.files);
		}
	}
};
</script>
