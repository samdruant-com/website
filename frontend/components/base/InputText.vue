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

	<v-menu
		v-else-if="type === 'date'"
		ref="menu"
		v-model="showDateMenu"
		:label="label"
		:placeholder="placeHolder"
		:outlined="outlined"
		:success="isValid === true"
		:error="isValid === false"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		max-width="290px"
		min-width="auto">
		<template #activator="{ on, attrs }">
			<v-text-field
				v-model="input"
				label="Picker in menu"
				prepend-icon="mdi-calendar"
				readonly
				v-bind="attrs"
				v-on="on" />
		</template>
		<v-date-picker
			v-model="date"
			type="month"
			no-title
			scrollable>
			<v-spacer />
			<v-btn
				text
				color="primary"
				@click="showDateMenu = false">
				Cancel
			</v-btn>
			<v-btn
				text
				color="primary"
				@click="$refs.menu.save(date)">
				OK
			</v-btn>
		</v-date-picker>
	</v-menu>

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
import TimeUtil from "~/utils/time.js";

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
			date: null,
			showDateMenu: false,
			showPassword: false
		};
	},
	watch: {
		date(newDate){
			this.input = this.formatForDateInput(newDate);
		},
		input(newInput){
			this.$emit("input", newInput);
		},
		value(newValue){
			this.setData(newValue);
		}
	},
	mounted(){
		this.setData(this.value);
	},
	methods:{
		setData(value){
			if(this.type === "date"){
				this.date = value;
			}else{
				this.input = value;
			}
		},
		formatForDateInput(date){
			const items = date.split("-");
			const year = items[0] || 0;
			const month = items[1] || 0;

			return `${year}-${month}`;
		}
	}
};
</script>
