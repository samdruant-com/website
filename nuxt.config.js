export default {
	// Server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "samdruant",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" }
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
		"~/assets/css/font.css",
		// layout styles
		"~/assets/css/layout.css"],

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
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa",
		// https://github.com/nuxt-community/vuetify-module
		"@nuxtjs/vuetify"
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: "en"
		}
	},

	// Vuetify config
	vuetify: {
		/* module options */
		defaultAssets: {
			font: {
				family: "Roboto"
			},
			icons: "md" // "md", "mdi", "fa", "fa4", false
		}
	}

};
