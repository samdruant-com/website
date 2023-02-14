export default {
	state() {
		return {
			notifications: [],
			warnings: [],
			errors: [],
			history: []
		};
	},
	getters: {
		getNotifications(state) {
			return state.notifications;
		},
		getWarnings(state) {
			return state.warnings;
		},
		getErrors(state) {
			return state.errors;
		}
	},
	mutations: {
		notify(state, message) {
			state.notifications.push(message);
		},
		notifyWarning(state, message) {
			state.warnings.push(message);
		},
		notifyError(state, message) {
			state.errors.push(message);
		},
		removeNotification(state) {
			const toast = state.notifications.pop();
			state.history.push(toast);
		},
		removeWarning(state) {
			const toast = state.warnings.pop();
			state.history.push(toast);
		},
		removeError(state) {
			const toast = state.errors.pop();
			state.history.push(toast);
		}
	}
};
