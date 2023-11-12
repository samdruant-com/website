import { register, login, refreshAccessToken } from "../middleware/auth";
import type { Route } from "./helpers/types";

const BASE_PATH = "/auth";

const routes: Route[] = [
	{
		path: `${BASE_PATH}/register`,
		method: "post",
		handler: register,
		upload: {
			field: "image",
			maxCount: 1,
		},
	},
	{
		path: `${BASE_PATH}/login`,
		method: "post",
		handler: login,
	},
	{
		path: `${BASE_PATH}/refresh`,
		method: "post",
		handler: refreshAccessToken,
	},
];

export { routes };