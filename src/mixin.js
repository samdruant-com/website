import Router from "./router";
import ROUTES from "./router/enums";

/**
 * returns mixin
 */
export const mixin = {
	data: function() {
		return {
			ROUTES: ROUTES
		};
	},
	methods: {
		goTo,
		scrollToTop
	}
};

/**
 * scrolls view to the top of screen if user enters sub-component
 */
export function scrollToTop() {
	window.scrollTo(0, 0);
}

/**
 * pushes router to route with routename
 * @param {String} routeName 
 */
export function goTo(routeName) {
	if (Router.currentRoute.name != routeName) {
		Router.push({
			name: routeName
		});
	}
}
