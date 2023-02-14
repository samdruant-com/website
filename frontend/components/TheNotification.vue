<template>
	<div>
		<v-snackbar
			v-for="notification in notifications"
			:key="notification.id"
			app
			multi-line
			:value="notification.show"
			:color="notification.color"
			:top="notification.top"
			:right="notification.right"
			:centered="notification.right === false"
			:timeout="notification.time"
			class="ignore-uppercase my-1"
			:style="`height: ${notification.height}px; padding-top: ${notification.padding}px;`">
			<!--eslint-disable-next-line vue/no-v-html-->
			<b v-html="notification.title" />

			<v-divider v-if="notification.message" />
			<!--eslint-disable-next-line vue/no-v-html-->
			<span v-html="notification.message" />

			<template #action="{ attrs }">
				<base-btn
					:small="true"
					v-bind="attrs"
					@click="removeNotification(notification.id)">
					Close
				</base-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import BaseBtn from "./base/BaseBtn.vue";

export default {
	name: "NotificationBar",
	components: { BaseBtn },
	data() {
		return {
			count: 0,
			notifications: []
		};
	},
	computed: {
    ...mapGetters({
      general: "app/notifications/getNotifications",
      warnings: "app/notifications/getWarnings",
      errors: "app/notifications/getErrors"
    }),
    getActiveNotifications() {
      return this.notifications.filter(
        (notification) => notification.show === true
      ).length;
    }
	},
	watch: {
		general(newGeneral) {
			// if general list is not empty
			if (newGeneral.length > 0) {
				// extract general
				const message = newGeneral[0] || "General notification";
				// toast general title and message
				this.toastGeneral("General", message);
				// remove general notification from list
				this.$store.commit("app/notifications/removeNotification");
			}
		},
		warnings(newWarnings) {
			// if warning list is not empty
			if (newWarnings.length > 0) {
				// extract warning
				const message = newWarnings[0] || "Something went wrong!";
				// toast warning title and message
				this.toastWarning("Warning", message);
				// remove warning notification from list
				this.$store.commit("app/notifications/removeWarning");
			}
		},
		errors(newErrors) {
			// if error list is not empty
			if (newErrors.length > 0) {
				// extract error title and message
				const message = newErrors[0] || "Something went wrong!";
				// toast error title and message
				this.toastErrors("Error", message);
				// remove error notification from list
				this.$store.commit("app/notifications/removeError");
			}
		}
	},
	methods: {
		toast(
			title,
			message,
			color = "primary",
			top = true,
			right = true,
			time = 5000
		) {

			const activeNotification = this.getActiveNotifications;
			const NOTIFICATION_HEIGHT_PX = 30;
			const NOTIFICATION_PADDING_PX = 3 * NOTIFICATION_HEIGHT_PX * activeNotification;

			this.notifications.push({
				id: this.count,
				show: true,
				color,
				title,
				message,
				top,
				right,
				time,
				height: NOTIFICATION_HEIGHT_PX,
				padding: NOTIFICATION_PADDING_PX
			});

			this.count = this.count + 1;
		},
		toastErrors(title, message) {
			this.toast(title, message, "error", true, true, 15000);
		},
		toastWarning(title, message) {
			this.toast(title, message, "warning", true, true, 5000);
		},
		toastGeneral(
			title,
			message,
			color = "primary",
			top = true,
			right = true,
			time = 5000
		) {
			this.toast(title, message, color, top, right, time);
		},
		removeNotification(id) {
			this.notifications = this.notifications.filter(
				(notification) => notification.id !== id
			);
		}
	}
};
</script>
