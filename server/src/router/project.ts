import { postProject, indexProjects, getProject, patchProject } from "../middleware/project";
import { acceptAuthentication } from "../middleware/auth";
import type { Route } from "./helpers/types";

const BASE_PATH = "/projects";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		handler: [postProject],
		protected: true
	},
	{
		path: BASE_PATH + '/:id',
		method: "get",
		handler: [acceptAuthentication, getProject]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [acceptAuthentication, indexProjects]
	},
	{
		path: BASE_PATH + '/:id',
		method: "patch",
		handler: [patchProject],
		protected: true
	}
];

export { routes };