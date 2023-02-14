export const state = () => ({
	user: null
});

export const getters = {
	getUser: (state) => state.user
};

export const mutations = {
	setUser: (state, user) => {
		state.user = user;
	}
};

export const actions = {
	async init(context) {
		const { data } = await this.$api.get("/users");
		context.commit("setUser", data);
		return data;
	},
	async update(context, patch) {
		const { data } = await this.$api.patch("/users", patch, {
			headers: {
				Authorization: `Bearer ${context.rootState.auth.accessToken}`
			}
		});

		context.commit("setUser", data);

		return data;
	}
};
