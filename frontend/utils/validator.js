export default {
	/**
	 * Returns true if string is empty
	 * @param {string} string - string to check
	 * @returns {boolean} boolean
	 */
	isEmpty(string) {
		return string === undefined || string === null || string.trim() === "";
	},

	/**
	 * Returns true if string is a valid url
	 * @param {string} string - url to check
	 * @returns {boolean} boolean
	 */
	isValidUrl(string) {
		const domainPattern = /^(http|https):\/\/\w+\.\w+.*/i;
		const localPattern = /^(http|https):\/\/\w+:\d+\/\w+.*/i;

		return domainPattern.test(string) || localPattern.test(string);
	},

	/**
	 * Returns true if string is a valid email
	 * @param {string} string - email to check
	 * @returns {boolean} boolean
	 */
	isValidEmail(string) {
		const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return pattern.test(string);
	}
};
