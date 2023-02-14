export default {
	/**
	 * Returns seo object
	 *
	 * @param {object} config - seo config
	 * @param {string} config.title - title of the page
	 * @param {string} config.description - description of the page
	 * @param {string} config.url - url of the page
	 * @param {string} config.image - image of the page
	 * @returns {object} - seo object
	 */
	formulateSeo({
		title = "Welcome",
		description = "This is a personal website for creatives",
		url = null,
		image = null
	} = {}) {

		// check if window is available
		if(typeof window !== "undefined") {
			// check if url is not provided
			if(!url) {
				// set url to current url
				url = window.location.href;
			}

			// check if image is not provided
			if(!image) {
				// set image to default image
				image = window.location.origin + "/images/placeholder.webp";
			}
		}

		const meta = [
			// hid is used as unique identifier. Do not use `vmid` for it as it will not work
			{
				hid: "description",
				name: "description",
				content: description
			},
			// og meta tags
			{
				hid: "og:title",
				property: "og:title",
				content: title
			},
			{
				hid: "og:description",
				property: "og:description",
				content: description
			},
			{
				hid: "og:image",
				property: "og:image",
				content: image
			},
			{
				hid: "og:url",
				property: "og:type",
				content: url
			},
			{
				hid: "og:type",
				property: "og:type",
				content: "website"
			}
		];

		if(!image) {
			// remove og:image if not provided
			meta.filter((item) => item.hid !== "og:image");
		}

		if(!url) {
			// remove og:url if not provided
			meta.filter((item) => item.hid !== "og:url");
		}

		return {
			title: title,
			meta: meta
		};
	}
};
