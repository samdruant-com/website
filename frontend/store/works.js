export const state = () => ({
	works: [],
	currentPage: 0,
	totalPages: 1
});

export const getters = {
	getWorks: (state) => {
		const works = [...state.works];
		return works.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});
	},
	getCurrentPage: (state) => state.currentPage,
	getTotalPages: (state) => state.totalPages
};

export const mutations = {
	addWorks: (state, newWorks) => {
		// add works to the end of the array
		state.works.push(...newWorks);
	},
	setWorks: (state, works) => {
		state.works = works;
	},
	setCurrentPage: (state, page) => {
		state.currentPage = page;
	},
	setTotalPages: (state, pages) => {
		state.totalPages = pages;
	}
};

export const actions = {
	async post(context, workForm){
		const { data, status } = await this.$api.post(
			"/works",
			workForm,
			{ headers: {
				"Content-Type": "multipart/form-data",
				"Authorization": `Bearer ${context.rootState.auth.accessToken}`
			} }
		);

		if (status !== 201) {
			throw new Error("Failed to post work");
		}

		return data;
	},
	async index(context, { limit = 4 } = {}){
		const totalPages = context.getters.getTotalPages;
		const currentPage = context.getters.getCurrentPage;
		const morePages = totalPages > currentPage;

		// if there are no more pages, then return
		if(morePages === false){
			return;
		}

		let query = "";
		if(limit > 0){
			query = morePages ? `?limit=${limit}&page=${currentPage + 1}` : `?limit=${limit}`;
		}

		// get access token from auth store's state
		const { data, status } = await this.$api.get(`/works${query}`);

		if (status !== 200) {
			throw new Error("Failed to get works");
		}

		const { works, currPage, pagesNum } = data;

		context.commit("addWorks", works || []);
		context.commit("setCurrentPage", currPage);
		context.commit("setTotalPages", pagesNum);

		return works;
	},
	async get(context, id){
		const {data, status} = await this.$api.get(`/works/${id}`);

		if(status !== 200){
			throw new Error(`Failed to get work ${id}`);
		}

		return data;
	},
	async patch(context, { id, patch }){
		const { data, status } = await this.$api.patch(
			`/works/${id}`,
			patch,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${context.rootState.auth.accessToken}`
				}
			}
		);

		if (status !== 200) {
			throw new Error("Failed to patch work");
		}

		return data;
	},
	async delete(context, id){
		const { status } = await this.$api.delete(`/works/${id}`, {
			headers: {
				Authorization: `Bearer ${context.rootState.auth.accessToken}`
			}
		});

		if (status !== 203) {
			throw new Error("Failed to delete work");
		}

		return true;
	}
};
