import api from "~/api";

export default (context, inject) => {
	// inject api into vue components and nuxt context
	inject("api", api);
};
