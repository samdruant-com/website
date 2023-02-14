<template>
	<base-page>
		<v-row
			justify="center"
			no-gutters
			class="mb-2">
			<v-col
				cols="12"
				md="8">
				<contact-form
					:user="user"
					@updated="updateUser()" />
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import { mapGetters } from "vuex";
import BasePage from "~/components/base/BasePage.vue";
import ContactForm from "~/components/contact/ContactForm.vue";

export default {
	components: { BasePage, ContactForm },
	middleware: ["auth"],
	computed: {
		...mapGetters({
			user: "user/getUser"
		})
	},
	methods:{
		updateUser(){
			this.$store.commit("app/notifications/notify", "Updated about!");
			this.$router.push("/contact");
		}
	}
};
</script>
