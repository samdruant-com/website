export const state = () => ({
	routes: [
		{ name: "Projects", path: "/projects" },
		{ name: "Contact", path: "/contact" },
		{ name: "CV", path: "/cv" }
	]
});

export const getters = {
	getRoutes: (state) => state.routes
};
