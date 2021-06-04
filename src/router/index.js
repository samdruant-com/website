import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			component: () => import("../components/layouts/LandingLayout"),
		}
	]
});

export default router;
