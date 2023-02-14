<template>
	<v-text-field
		v-if="type === 'password'"
		v-model="input"
		:label="label"
		:placeholder="placeHolder"
		:type="showPassword ? 'text' : 'password'"
		:outlined="outlined"
		:success="isValid === true"
		:error="isValid === false">
		<template #append>
			<base-btn
				text
				small
				color="secondary"
				@click="showPassword = !showPassword">
				{{ showPassword ? 'hide' : 'show' }}
			</base-btn>
		</template>
	</v-text-field>

	<v-text-field
		v-else
		v-model="input"
		:label="label"
		:placeholder="placeHolder"
		:type="type"
		:outlined="outlined"
		:success="isValid === true"
		:error="isValid === false" />
</template>

<script>
import BaseBtn from "./BaseBtn.vue";
export default {
	components: { BaseBtn },
	props: {
		value: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		placeHolder: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: "text"
		},
		outlined: {
			type: Boolean,
			default: true
		},
		isValid: {
			type: Boolean,
			default: null
		}
	},
	emits: ["input"],
	data(){
		return {
			input: null,
			showPassword: false
		};
	},
	watch: {
		input(newInput){
			this.$emit("input", newInput);
		},
		value(newValue){
			this.input = newValue;
		}
	},
	mounted(){
		this.input = this.value;
	}
};
</script>
