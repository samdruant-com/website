export const state = () => ({
	routes: [
		{ name: "Works", path: "/works" },
		{ name: "Contact", path: "/contact" }
	],
	showSidebar: false
});

export const getters = {
	getRoutes: (state) => state.routes,
	getSidebarVisibility: (state) => state.showSidebar
};

export const mutations = {
	setSidebarVisbitility: (state, visibility) => {
		state.showSidebar = visibility;
	}
};
