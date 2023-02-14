/**
 * The purpose of this file is to provide a simple interface to the browser's
 * local storage. This is useful for storing data that you want to persist
 * between page refreshes.
 */

export default {
	ENUMS: {
		TOKEN:{
			ACCESS: "token_access",
			REFRESH: "token_refresh"
		}
	},

	/**
	 * Saves a value to local storage
	 *
	 * @param {string} key - key to save value under
	 * @param {object} value - value to save
	 * @returns {boolean} true if successful
	 */
	save(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			return false;
		}
	},

	/**
	 * Gets a value from local storage
	 *
	 * @param {string} key - key to get value from
	 * @returns {object} value
	 */
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	},

	/**
	 * Removes a value from local storage
	 *
	 * @param {string} key - key to remove
	 * @returns {boolean} true if successful
	 */
	remove(key) {
		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			return false;
		}
	}
};
