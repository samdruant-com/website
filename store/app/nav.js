export const state = () => ({
	routes: [
		//{ name: "Projects", path: "/projects" },
		{ name: "Contact", path: "/contact" }
	]
});

export const getters = {
	getRoutes: (state) => state.routes
};
