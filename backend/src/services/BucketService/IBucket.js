export class IBucket {
	/**
	 * function to save file
	 * 
	 * @param {string} id - file unique identifier
	 * @param {Express.Multer.File} file - file to save
	 */
	save(id, file) {}
	/**
	 * Returns file
	 *
	 * @param {string} id - file unique identifier
	 */
	get(id) {}
	/**
	 * Removes file
	 *
	 * @param {string} id - file unique identifier
	 */
	remove(id) {}
}