<template>
	<base-form
		:update-mode="true"
		@updated="updateContact()">
		<h3>About You</h3>

		<v-row justify="center">
			<v-col
				cols="12"
				md="6">
				<v-divider class="mt-2" />
				Profile Photo
				<div>
					<base-image
						v-if="form.image"
						:src="getPhoto"
						width="250px"
						alt="Profile Photo"
						class="mt-1" />
					<input-file
						class="mt-1"
						:color="form.image ? 'warning' : 'primary'"
						:prompt="form.image ? 'Change Photo' : 'Add Photo'"
						@input="handleImage" />
				</div>
			</v-col>

			<v-col
				cols="12"
				md="6">
				<v-divider class="mt-2" />
				Name
				<input-text
					v-model="form.name"
					place-holder="What's your name" />
				Email
				<input-text
					v-model="form.email"
					place-holder="What's your email" />
				<div>
					<div class="links-header">
						<span class="mr-auto">Links</span>
						<base-btn
							small
							rounded
							color="primary"
							:disabled="thereIsAnEmptyLink"
							class="ml-auto"
							@click="addLink()">
							Add Link
						</base-btn>
					</div>
					<small
						v-if="form.links.length === 0"
						class="ignore-uppercase">
						No links added
					</small>
					<div v-else>
						<contact-form-link
							v-for="link in form.links"
							:key="link.url"
							:link="link"
							style="width:100%;"
							class="mt-1"
							@update="updateLink"
							@delete="removeLink" />
					</div>
				</div>
			</v-col>

			<v-col cols="12">
				<v-divider class="mt-2" />
				Bio
				<client-only>
					<input-editor v-model="form.bio" />
				</client-only>
			</v-col>
		</v-row>
	</base-form>
</template>

<script>
import BaseBtn from "../base/BaseBtn.vue";
import BaseForm from "../base/BaseForm.vue";
import BaseImage from "../base/BaseImage.vue";
import InputEditor from "../base/InputEditor.vue";
import InputFile from "../base/InputFile.vue";
import InputText from "../base/InputText.vue";
import ContactFormLink from "./ContactFormLink.vue";
import ValidatorUtil from "../../utils/validator.js";

function formulateUser(user){
	const form = new FormData();
	form.append("name", user.name);
	form.append("email", user.email);
	form.append("bio", user.bio);
	form.append("links", JSON.stringify(user.links));

	if(user.image.file){
		const image = user.image;
		// create blob from file
		const blob = new Blob([image.file], { type: image.file.type });
		// append file to form
		form.append("file", blob, image.file.name);
		// set image file to file name
		user.image.fileName = image.file.name;
		// delete file from image object
		delete user.image.file;
	}

	form.append("image", JSON.stringify(user.image));

	return form;
}

export default {
	components: { BaseForm, BaseImage, InputEditor, InputFile, InputText, BaseBtn, ContactFormLink },
	props: {
		user: {
			type: Object,
			default: null
		}
	},
	emits: ["updated"],
	data(){
		return {
			form: {
				name: "",
				email: "",
				bio: "",
				image: null,
				links: [],
				temporaryLink: {
					label: "",
					url: ""
				}
			}
		};
	},
	computed:{
		thereIsAnEmptyLink(){
			return this.form.links.some(
				link => ValidatorUtil.isEmpty(link.label) || ValidatorUtil.isEmpty(link.url)
			);
		},
		getPhoto(){
			return this.form.image.src;
		}
	},
	watch: {
		user(newUser){
			if(newUser){
				this.setForm(newUser);
			}
		}
	},
	created() {
		if(this.user){
			this.setForm(this.user);
		}
	},
	methods: {
		async updateContact(){
			// remove temporary link attribute from form
			delete this.form.temporaryLink;

			try {
				const form = formulateUser(this.form);
				const patched = await this.$store.dispatch("user/update", form);

				if(patched){
					this.$emit("updated", patched);
				}
			} catch (error) {
				this.$store.commit("app/notifications/notifyError", error);
			}
		},
		setForm(user){
			this.form.name = user.name || "";
			this.form.email = user.email || "";
			this.form.bio = user.bio || "";
			this.form.image = user.image || null;
			this.form.links = user.links || [];
		},
		addLink(){
			const links = [...this.form.links];
			const emptyLink = {label: null, url: null};

			// add an empty link to the front of the links array
			links.unshift(emptyLink);

			// updates the links array
			this.form.links = links;
		},
		updateLink({oldLink, newLink}){
			// find old link in links array
			const links = [...this.form.links];
			const index = links.indexOf(oldLink);

			// replace old link with new link
			if(index > -1){
				links.splice(index, 1, newLink);
			}

			this.form.links = links;
		},
		removeLink(link){
			const links = [...this.form.links];

			// find index of link with the same label and url
			const index = links.findIndex(
				({label, url}) => label === link.label && url === link.url
			);

			// remove link from links array
			if(index > -1){
				links.splice(index, 1);
			}

			// update links array
			this.form.links = links;
		},
		handleImage(files) {
			if(files.length){
				this.form.image = {
					src: URL.createObjectURL(files[0]),
					file: files[0],
					fileName: files[0].name
				};
			}
		}
	}
};
</script>

<style scoped>
.links-header{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
