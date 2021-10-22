import works from "./mock/works";

export default axios => ({
	index(){
		return works;
	},
	get(id){
		return works.find( work => work.id === id);
	}
});
