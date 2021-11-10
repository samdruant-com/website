import MockHelper from "./mock/helper";
import MockProjects from "./mock/projects";

export default axios => ({
	index(){

		const mockProjects = MockProjects();
		const projects = mockProjects.map((project) => {
			const works = MockHelper.populateProjectWorks(project);
			project.works = works;

			return project;
		});

		return { data: projects };
	},
	get(id){
		const mockProjects = MockProjects();
		const project = mockProjects.find( project => project._id === Number(id));
		const works = MockHelper.populateProjectWorks(project);

		const worksWithImages = works.map(work => {
			const images = MockHelper.populateWorkImages(work);
			work.images = images;
			return work;
		});

		project.works = worksWithImages;

		return { data: project };
	}
});
