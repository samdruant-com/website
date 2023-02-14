<template>
	<base-card
		color="dark"
		:outlined="true"
		:style="isValid ? '' : 'border: 1px red solid;'">
		<v-row class="ignore-uppercase">
			<v-col
				cols="12"
				md="8">
				<!-- label -->
				<input-text
					v-if="edit"
					v-model="form.label"
					place-holder="Give the url a label" />
				<b v-else>{{ link.label }}</b>

				<br>

				<!-- url -->
				<input-text
					v-if="edit"
					v-model="form.url"
					place-holder="Add a url" />
				<a
					v-else
					:href="link.url"
					target="_blank">{{ link.url }}</a>
			</v-col>

			<v-col
				cols="12"
				md="4">
				<base-btn
					v-if="edit"
					small
					text
					class="ma-1"
					:disabled="!isValid"
					@click="edit = false; updateLink()">
					{{ newLink ? 'Save' : 'Update' }}
				</base-btn>
				<base-btn
					v-else
					small
					text
					class="ma-1"
					@click="edit = true">
					Change
				</base-btn>
				<base-btn
					small
					text
					color="error"
					class="ma-1"
					@click="deleteLink()">
					Delete
				</base-btn>
			</v-col>
		</v-row>
	</base-card>
</template>

<script>
import BaseBtn from "../base/BaseBtn.vue";
import BaseCard from "../base/BaseCard.vue";
import InputText from "../base/InputText.vue";
import ValidatorUtil from "../../utils/validator.js";
export default {
	components: { BaseBtn, BaseCard, InputText },
	props: {
		link: {
			type: Object,
			required: true
		},
		newLink: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update", "delete"],
	data(){
		return {
			edit: false,
			form: {
				label: null,
				url: null
			}
		};
	},
	computed: {
		isValid(){
			return (
				!ValidatorUtil.isEmpty(this.form.label) &&
				!ValidatorUtil.isEmpty(this.form.url) &&
				ValidatorUtil.isValidUrl(this.form.url)
			);
		}
	},
	created(){
		this.form.label = this.link.label;
		this.form.url = this.link.url;

		if(!this.isValid){
			this.edit = true;
		}
	},
	methods: {
		updateLink(){
			this.$emit("update", {
				oldLink: this.link,
				newLink: {
					label: this.form.label,
					url: this.form.url
				}
			});
		},
		deleteLink(){
			this.$emit("delete", this.link);
		}
	}
};
</script>
