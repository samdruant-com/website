import multer from 'multer';
import type { RequestHandler } from 'express';

/**
 * Returns a multer instance with the given configuration.
 * 
 * @param config - optional configuration object
 * @param config.allowedTypes - allowed file types (default png, jpeg, jpg, gif)
 * @param config.maxFileSize - maximum file size in bytes (default 5mb)
 */
function getMulter(config?: {allowedTypes?: string[], maxFileSize?: number }): multer.Multer {
	return multer({
		// store file in memory as buffer
		storage: multer.memoryStorage(),
		
		// limit file size (default 5mb)
		limits: { fileSize: config?.maxFileSize || 5 * 1024 * 1024, },
		
		// filter file types (default png, jpeg, jpg, gif)
		fileFilter: (req, file, cb) => {
			const allowedTypes = config?.allowedTypes || ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
			if (!allowedTypes.includes(file.mimetype)) {
				const error = new Error('Wrong file type');
				error.message = 'Wrong file type';
				return cb(error);
			}
			cb(null, true);
		},
	});
}

/**
 * Returns a multer middleware that handles file uploads.
 * 
 * @param field - name of the field that contains the file
 * @param multiple - maximum number of files allowed (default: false)
 * @param config - optional configuration object
 * @param config.maxCount - maximum number of files
 * @param config.fileSize - maximum file size in bytes (default 5mb)
 * @param config.allowedTypes - allowed file types (default png, jpeg, jpg, gif)
 */
function parseFile(field: string, multiple?: boolean, config?: { maxCount?: number, fileSize?: number, allowedTypes?: string[]}): RequestHandler {

	const multerInstance = getMulter({ maxFileSize: config?.fileSize, allowedTypes: config?.allowedTypes });

	if(multiple){
		return config?.maxCount && config?.maxCount > 0
			? multerInstance.array(field, config.maxCount) 
			: multerInstance.array(field);
	} else {
		return multerInstance.single(field);
	}
}

export { parseFile, getMulter };