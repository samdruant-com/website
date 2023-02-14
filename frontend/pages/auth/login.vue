<template>
	<base-page>
		<v-row justify="center">
			<v-col
				cols="11"
				md="6">
				<base-card
					color="dark"
					:outlined="true">
					<base-form>
						<h2>Login</h2>
						<v-divider class="mb-2" />
						Email <input-text v-model="form.email" />
						Password <input-text
							v-model="form.password"
							type="password" />

						<template #actions>
							<base-btn
								color="primary"
								:block="true"
								@click="login()">
								Login
							</base-btn>
						</template>
					</base-form>
				</base-card>
			</v-col>
		</v-row>
	</base-page>
</template>

<script>
import BaseBtn from "~/components/base/BaseBtn.vue";
import BaseCard from "~/components/base/BaseCard.vue";
import BaseForm from "~/components/base/BaseForm.vue";
import BasePage from "~/components/base/BasePage.vue";
import InputText from "~/components/base/InputText.vue";
export default {
	components: { BasePage, BaseForm, InputText, BaseBtn, BaseCard },
	data() {
		return {
			form: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		async login() {
			try {
				await this.$store.dispatch("auth/login", this.form);

				return this.$route.query.redirect
					? this.$router.push(this.$route.query.redirect)
					: this.$router.push("/works");

			} catch (error) {
				this.$store.commit("app/notifications/notifyError", error.response?.data?.message || error.message || "Login failed");
			}
		}
	}
};
</script>
