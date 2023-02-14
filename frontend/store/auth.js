import StorageUtil from "~/utils/storage";

const ENUMS = StorageUtil.ENUMS;

export const state = () => ({
	accessToken: StorageUtil.get(ENUMS.TOKEN.ACCESS) || null,
	refreshToken: StorageUtil.get(ENUMS.TOKEN.REFRESH) || null,
	isLoggedIn: StorageUtil.get(ENUMS.TOKEN.ACCESS) ? true : false
});

export const getters = {
	isLoggedIn: (state) => state.isLoggedIn
};

export const mutations = {
	setLoggedIn: (state, isLoggedIn) => {
		state.isLoggedIn = isLoggedIn;
	},
	setAccessToken: (state, accessToken) => {
		state.accessToken = accessToken;
		StorageUtil.save(ENUMS.TOKEN.ACCESS, accessToken);
	},
	setRefreshToken: (state, refreshToken) => {
		state.refreshToken = refreshToken;
		StorageUtil.save(ENUMS.TOKEN.REFRESH, refreshToken);
	},
	logout: (state) => {
		state.isLoggedIn = false;
		state.accessToken = null;
		state.refreshToken = null;
		StorageUtil.remove(ENUMS.TOKEN.ACCESS);
		StorageUtil.remove(ENUMS.TOKEN.REFRESH);
	}
};

export const actions = {
	async login({ commit }, { email, password }) {
		const response = await this.$api.post("/auth/login", { email, password });
		const data = response?.data;

		if(data){
			commit("setAccessToken", response?.data.tokens.accessToken);
			commit("setRefreshToken", response?.data.tokens.refreshToken);
			commit("setLoggedIn", true);
			return response.data;
		}else{
			throw new Error("Invalid credentials");
		}
	},
	async register(context, { email, password, secret }) {
		const response = await this.$api.post("/auth/register", { email, password, secret });
		const data = response?.data;

		if(data){
			return response.data;
		}else{
			throw new Error("Invalid credentials");
		}
	},
	async refresh({ commit, state }) {
		const { data, status } = await this.$api.post(
			"/auth/refresh",
			{ refreshToken: state.refreshToken },
			{ headers: { "Authorization": `Bearer ${state.accessToken}` } }
		);

		if(status !== 200){
			throw new Error("Failed to refresh tokens");
		}

		const { accessToken, refreshToken } = data.tokens;
		commit("setAccessToken", accessToken);
		commit("setRefreshToken", refreshToken);
		commit("setLoggedIn", true);
	}
};
