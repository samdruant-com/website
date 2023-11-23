import { postProject, indexProjects, getProject, patchProject } from "../middleware/project";
import type { Route } from "./helpers/types";

const BASE_PATH = "/projects";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		handler: [postProject]
	},
	{
		path: BASE_PATH + '/:id',
		method: "get",
		handler: [getProject]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [indexProjects]
	},
	{
		path: BASE_PATH + '/:id',
		method: "patch",
		handler: [patchProject]
	}
];

export { routes };