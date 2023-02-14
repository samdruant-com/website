/**
 * This middleware redirects the user to
 * the login page if they are not logged in.
 */
export default function({ store, route, redirect }) {
	if(!store.getters["auth/isLoggedIn"]) {

		const currentRoute = route.path;
		const loginPath = "/auth/login";
		redirect(loginPath + "?redirect=" + currentRoute);
	}
}
