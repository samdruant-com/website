export default function({ route, redirect }) {
	if (route.path !== "/" && route.path !== "/contact") {
		return redirect("/");
	}
}
