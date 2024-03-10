/**
 * Returns a slug
 * 
 * @param {string} sample - text to be converted to slug
 */
function createSlug(sample: string): string{
	
	if(sample.trim().length === 0){
		throw new Error('sample string required');
	}

	/**
   * convert name to lowercase and replace all non-alphanumeric
   * characters except dashes and spaces and then 
   */
	let slug = sample.toLowerCase();
	
	slug = slug
		.replace(/[^a-z0-9- ]/g, "") // remove all non-alphanumeric characters except dashes and spaces
		.replace(/(^\s+)|(\s+$)/g, "") 
		.replace(/\s+/g, "-"); // replace all spaces with dashes except for spaces at the beginning and end of the string

	return slug;
}

/**
 * Returns true if string is slug-like
 * 
 * @param {string} slug - slug to be checked
 * @returns boolean
 */
function isSlug(slug: string): boolean {
	return slug.match(/^[a-z0-9-]+$/) !== null;
}

export {
	createSlug,
	isSlug
};