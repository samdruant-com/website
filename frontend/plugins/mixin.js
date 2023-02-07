import Vue from "vue";

if (!Vue._GLOBAL_MIXIN_) {
	Vue._GLOBAL_MIXIN_ = true;

	Vue.mixin({
		computed: {
			// screen size
			getScreenBreakpoint() { return this.$vuetify.breakpoint.name; },
			isScreenMobile() { return this.$vuetify.breakpoint.name === "xs"; },
			isScreenTablet() { return this.$vuetify.breakpoint.name === "sm"; },
			isScreenDesktop() { return this.$vuetify.breakpoint.name === "md" || this.$vuetify.breakpoint.name === "lg" || this.$vuetify.breakpoint.name === "xl"; }
		}
	});
}
