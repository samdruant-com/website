import { getUserByUsername, indexUsers, patchUser } from "../middleware/user";
import type { Route } from "./helpers/types";

const BASE_PATH = "/users";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "get",
		handler: indexUsers,
	},
	{
		path: `${BASE_PATH}/:username`,
		method: "get",
		handler: getUserByUsername,
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "patch",
		handler: patchUser,
		protected: true,
		upload: {
			field: "image",
			maxCount: 1,
		},
	},
];

export { routes };