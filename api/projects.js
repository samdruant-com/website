import projects from "./mock/projects";

export default axios => ({
	index(){
		return projects;
	},
	get(id){
		return projects.find( project => project.id === id);
	}
});
