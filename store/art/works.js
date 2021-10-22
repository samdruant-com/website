export const state = () => ({
	works: []
});

export const getters = {
	getWorks: (state) => state.works
};

export const mutations = {
	setWorks: (state, works) => {
		state.works = works;
	}
};

export const actions = {
	index(context){
		try {
			const response = this.$api.works.index();
			const works = response.data;

			context.commit("setWorks", works);
			return works;

		} catch (error) {
			context.commit("error/addError", error, { root: true });
		}
	},
	get(context, id){
		try {
			const response = this.$api.works.get(id);
			return response.data;;

		} catch (error) {
			context.commit("error/addError", error, { root: true });
		}
	}
};
