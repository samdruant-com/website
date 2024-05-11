import { postWork, indexWorks, getWork, patchWork, deleteWork } from "../middleware/work";
import { acceptAuthentication } from "../middleware/auth";
import { getMulter } from "./helpers/parser";
import type { Route } from "./helpers/types";

const BASE_PATH = "/works";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		protected: true,
		handler: [getMulter().any(), postWork]
	},
	{
		path: BASE_PATH + '/:id',
		method: "get",
		handler: [acceptAuthentication, getWork]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [acceptAuthentication, indexWorks]
	},
	{
		path: BASE_PATH + '/:id',
		method: "patch",
		protected: true,
		handler: [getMulter().any(), patchWork]
	},
	{
		path: BASE_PATH + '/:id',
		method: "delete",
		handler: [deleteWork],
		protected: true
	}
];

export { routes };