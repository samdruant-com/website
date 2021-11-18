export default {
	// Server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Sam Druant",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content:
					"Sam plays with the idea of rewriting history and reality, questioning and updating the dominant narrative. In a playful and ironic way, she provides a feminist critique of the narratives about gender roles embedded in Western culture and of the sexism still confronting women on a daily basis. Her work aims to spark a conversation about how women are perceived, the male gaze, and prevailing binary hierarchical oppositions."
			}
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Generate settings
	generate: {
		fallback: true
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		// font styles
		"~/assets/css/font.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~/plugins/api.js" },
		{ src: "~/plugins/mixin.js", mode: "client" }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://github.com/nuxt-community/vuetify-module
		"@nuxtjs/vuetify"
	],

	// Vuetify config
	vuetify: {
		/* module options */
		defaultAssets: {
			font: {
				family: "Helvetica"
			},
			icons: "md" // "md", "mdi", "fa", "fa4", false
		}
	}
};
