export const state = () => ({
	dark: false
});

export const getters = {
	isDarkTheme: (state) => state.dark
};

export const mutations = {
	setThemeToDark: (state, theme) => {
		state.dark = theme;
	},
	toggle: (state) => {
		state.dark = !state.dark;
	}
};
