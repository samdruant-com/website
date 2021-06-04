import Vue from "vue";
import Vuex from "vuex";

import Auth from "./module/auth";
import User from "./module/user";
import Theme from "./module/theme";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth: Auth,
		user: User,
		theme: Theme,
	}
});

export default store;
