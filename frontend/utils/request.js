/**
 * The purpose of this file is to provide support for
 * http requests in a reusable manner.
 */

export default {
	convertObjectToFormData(obj) {
		const formData = new FormData();

		for (const key in obj) {
			// if value is an object, run this function again
			// and append the result to the form data
			if (typeof obj[key] === "object") {
				const subFormData = this.convertObjectToFormData(obj[key]);
				for (const subKey in subFormData) {
					formData.append(subKey, subFormData[subKey]);
				}
			}
			// if value is an array, loop through the array
			// and append each value to the form data
			else if (Array.isArray(obj[key])) {
				obj[key].forEach((value) => {
					formData.append(key, value);
				});
			}
			// otherwise, just append the value to the form data
			else {
				formData.append(key, obj[key]);
			}
		}

		return formData;
	}
};
