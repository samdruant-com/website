import projects from "./projects";
import works from "./works";
import images from "./images";

export default axios => ({
	projects: projects(axios),
	works: works(axios),
	images: images(axios)
});
