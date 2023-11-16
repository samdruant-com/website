import multer from "multer";
import { postWork, indexWorks, getWork, patchWork } from "../middleware/work";
import type { Route } from "./helpers/types";

// define a multer config that accepts a formdata
// with a couple of fields and multiple files
const upload = multer({
	// store file in memory as buffer
	storage: multer.memoryStorage(),
  
	// filter file types (default png, jpeg, jpg, gif)
	fileFilter: (req, file, cb) => {
		const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
		if (!allowedTypes.includes(file.mimetype)) {
			const error = new Error('Wrong file type');
			error.message = 'Wrong file type';
			return cb(error);
		}
		cb(null, true);
	},
});

const BASE_PATH = "/works";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		handler: [upload.any(), postWork]
	},
	{
		path: BASE_PATH + '/:id',
		method: "get",
		handler: [getWork]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [indexWorks]
	},
	{
		path: BASE_PATH + '/:id',
		method: "put",
		handler: [upload.any(), patchWork]
	}
];

export { routes };