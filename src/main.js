import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import {mixin as Mixin} from "./mixin";

import Bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
require("./assets/css/app.css");
require("./assets/css/fonts.css");
require("./assets/css/themes.css");

Vue.config.productionTip = false;

// plugins and mixins
Vue.use(Bootstrap);

new Vue({
	mixin: Mixin,
	router: Router,
	render: (h) => h(App),
}).$mount("#app");
