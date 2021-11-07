import MockProjects from "./mock/projects";
import MockWorks from "./mock/works";

function getProjectWorks(project){
	if(!project) return [];

	const works = [];

	for(let i = 0; i < project.works.length; i++){
		const workId = project.works[i];
		const work = MockWorks.find((item) => { item.id === workId;});

		works.push(work);
	}

	return works;
}

export default axios => ({
	index(){
		const projects = MockProjects.map((project) => {
			const works = getProjectWorks(project);
			project.works = works;

			return project;
		});

		return { data: projects };
	},
	get(id){
		const project = MockProjects.find( project => project.id === Number(id));
		const works = getProjectWorks(project);
		project.works = works;

		return { data: project };
	}
});
