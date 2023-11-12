import multer from 'multer';
import type { RequestHandler } from 'express';

/**
 * Returns a multer middleware that handles file uploads.
 * 
 * @param field - name of the field that contains the file
 * @param maxCount - maximum number of files allowed
 * @param config - optional configuration object
 * @param config.fileSize - maximum file size in bytes (default 5mb)
 * @param config.allowedTypes - allowed file types (default png, jpeg, jpg, gif)
 */
function upload(field: string, maxCount: number, config?: { fileSize: number, allowedTypes: string[]}): RequestHandler {

	const multerInstance = multer({
		// store file in memory as buffer
		storage: multer.memoryStorage(),
		
		// limit file size (default 5mb)
		limits: { fileSize: config?.fileSize || 5 * 1024 * 1024, },
		
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

	return maxCount > 1 
		? multerInstance.array(field, maxCount) 
		: multerInstance.single(field);
}

export { upload };