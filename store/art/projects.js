export const state = () => ({
	projects: []
});

export const getters = {
	getProjects: (state) => state.projects
};

export const mutations = {
	setProjects: (state, projects) => {
		state.projects = projects;
	}
};

export const actions = {
	index(context){
		try {
			const response = this.$api.projects.index();
			const projects = response.data;

			context.commit("setProjects", projects);
			return projects;

		} catch (error) {
			context.commit("error/addError", error, { root: true });
		}
	},
	get(context, id){
		try {
			const response = this.$api.projects.get(id);
			return response.data;;

		} catch (error) {
			context.commit("error/addError", error, { root: true });
		}
	}
};
