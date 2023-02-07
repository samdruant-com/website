export const state = () => ({
	errors: [],
	history: []
});

export const getters = {
	getErrors: (state) => [...state.errors]
};

export const mutations = {
	addError: (state, error) => {
		state.errors.push(error);
	},
	removeError: (state) => {
		const error = state.errors.pop();
		state.history.push(error);
	}
};
