<template>
	<v-sheet class="pa-1 pa-md-2 rounded-lg">
		<v-row>
			<v-col
				cols="12"
				:order="contentOrder">
				<slot class="pa-1 pa-md-2" />
			</v-col>

			<v-col
				v-if="!hideActions"
				cols="12"
				:order="actionsOrder">
				<slot
					name="actions"
					class="mt-1 mt-md-2">
					<v-row :justify="actionsOrder < contentOrder ? 'end' : 'center'">
						<v-col
							v-if="showCreateBtn"
							cols="12"
							md="auto">
							<base-btn
								color="primary"
								:rounded="true"
								:disabled="disableCreate"
								@click="$emit('created')">
								Create
							</base-btn>
						</v-col>
						<v-col
							v-if="showUpdateBtn"
							cols="12"
							md="auto">
							<base-btn
								color="primary"
								:rounded="true"
								:disabled="disableUpdate"
								@click="$emit('updated')">
								Update
							</base-btn>
						</v-col>
						<v-col
							v-if="showDeleteBtn"
							cols="12"
							md="auto">
							<base-btn
								color="error"
								:rounded="true"
								:outlined="true"
								:disabled="disableDelete"
								@click="$emit('deleted')">
								Delete
							</base-btn>
						</v-col>
					</v-row>
				</slot>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script>
import BaseBtn from "./BaseBtn.vue";
export default {
	components: { BaseBtn },
	props: {
		editMode: {
			type: Boolean,
			default: false
		},
		hideActions: {
			type: Boolean,
			default: false
		},
		actionsTop: {
			type: Boolean,
			default: false
		},
		createMode: {
			type: Boolean,
			default: undefined
		},
		updateMode: {
			type: Boolean,
			default: undefined
		},
		deleteMode: {
			type: Boolean,
			default: undefined
		},
		disableCreate: {
			type: Boolean,
			default: false
		},
		disableUpdate: {
			type: Boolean,
			default: false
		},
		disableDelete: {
			type: Boolean,
			default: false
		}
	},
	emits: ["created", "updated", "deleted"],
	computed:{
		contentOrder(){
			return this.actionsTop ? 2 : 1;
		},
		actionsOrder(){
			return this.actionsTop ? 1 : 2;
		},
		showCreateBtn(){
			if(this.updateMode || this.deleteMode){
				return false;
			}else{
				return this.createMode !== undefined ? this.createMode : !this.editMode;
			}
		},
		showUpdateBtn(){
			// show update if updateMode is true or editMode is true
			return this.updateMode !== undefined ? this.updateMode : this.editMode;
		},
		showDeleteBtn(){
			// show delete if deleteMode is true or editMode is true
			return this.deleteMode !== undefined ? this.deleteMode : this.editMode;
		}
	}
};
</script>
