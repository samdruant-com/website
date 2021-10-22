export const state = () => ({
	routes: [
		{ name: "page", path: "/page" }
	]
});

export const getters = {
	getRoutes: (state) => state.routes
};
