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
						<h2>Register</h2>
						<v-divider class="mb-2" />
						Email <input-text v-model="form.email" />
						Password <input-text
							v-model="form.password"
							type="password" />
						Secret <input-text
							v-model="form.secret"
							type="password" />

						<template #actions>
							<base-btn
								color="primary"
								:block="true"
								@click="register()">
								Register
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
				password: "",
				secret: ""
			}
		};
	},
	methods: {
		async register() {
			try {
				await this.$store.dispatch("auth/register", this.form);
				this.$store.commit("app/notifications/notify", "Registration was successful. Try to login now.");
				this.$router.push("/auth/login");
			} catch (error) {
				this.$store.commit("app/notifications/notifyError", error.response?.data?.message || error.message || "Login failed");
			}
		}
	}
};
</script>
