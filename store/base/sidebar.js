export const state = () => ({
	show: false
});

export const getters = {
	getVisibility: (state) => state.show
};

export const mutations = {
	setVisbitility: (state, visibility) => {
		state.show = visibility;
	},
	toggle: (state) => {
		state.show = !state.show;
	}
};
