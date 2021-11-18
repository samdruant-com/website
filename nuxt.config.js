// meta text
const metaTitle = "Sam Druant";
const metaDescription = "Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.";

export default {
	// Server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: metaTitle,
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: metaDescription
			},
			// og meta tags
			{
				hid: "og:type",
				property: "og:type",
				content: "website"
			},
			{
				hid: "og:title",
				property: "og:title",
				content: "Sam Druant"
			},
			{
				hid: "og:description",
				property: "og:description",
				content: metaDescription
			},
			{
				hid: "og:image",
				property: "og:image",
				content: "/images/DRAGONS1.jpg"
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
