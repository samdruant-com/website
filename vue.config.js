module.exports = {
	chainWebpack: config => {
		// rules
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap(options => {
				options.transformAssetUrls = {
					img: "src",
					image: "xlink:href",
					"b-avatar": "src",
					"b-img": "src",
					"b-img-lazy": ["src", "blank-src"],
					"b-card": "img-src",
					"b-card-img": "src",
					"b-card-img-lazy": ["src", "blank-src"],
					"b-carousel-slide": "img-src",
					"b-embed": "src"
				};
				return options;
			});

		// plugin
		config.plugin("html").tap(args => {
			args[0].title = "Sam Druant";
			return args;
		});
	},
};
