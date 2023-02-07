export const state = () => ({
	images: []
});

export const getters = {
	getImages: (state) => state.images.slice()
};

export const mutations = {
	setImages: (state, images) => {
		state.images = images;
	}
};

export const actions = {
	index(context){
		try {
			const response = this.$api.images.index();
			const images = response.data;
			return images;

		} catch (error) {
			context.commit("app/error/addError", error, { root: true });
		}
	},
	get(context, id){
		try {
			const response = this.$api.images.get(id);
			return response.data;

		} catch (error) {
			context.commit("app/error/addError", error, { root: true });
		}
	}
};
