export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
	index(context){
		try {
			const response = this.$api.images.index();
			const images = response.data;
			return images;

		} catch (error) {
			context.commit("error/addError", error, { root: true });
		}
	},
	get(context, id){
		try {
			const response = this.$api.images.get(id);
			return response.data;;

		} catch (error) {
			context.commit("error/addError", error, { root: true });
		}
	}
};
