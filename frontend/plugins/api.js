export default function ({ $axios, $config, redirect, store, route }, inject) {
	// Create a custom axios instance
	const api = $axios.create();

	// Set baseURL to something different
	api.setBaseURL($config.API_URL);

	// If a request fails with 401, refresh token and retry request
	api.onResponseError(async (error) => {
		const code = parseInt(error.response && error.response.status);
		const message = error.response?.data || error.response?.statusText || error.message;

		const loggedIn = store.getters["auth/isLoggedIn"];

		console.error({responseError: error});

		if (code === 401 && loggedIn) {
			// set login to false
			store.commit("auth/setLoggedIn", false);

			try {
			// try to refresh token
				await store.dispatch("auth/refresh");

				// retry request
				return await api.request(error.config);

			} catch (error) {
				console.error({refreshError: error});
				// if refresh token fails, logout user
				store.commit("auth/logout");
				store.commit("app/notifications/notifyError", "Your session has expired. Please login again.");

				// redirect to login page
				const currentRoute = route.path;
				const loginPath = "/auth/login";
				return redirect(loginPath + "?redirect=" + currentRoute);
			}
		}

		// pass error to caller
		return Promise.reject({status: code, message: message});
	});

	// Inject to context as $api
	inject("api", api);
}
