import images from "./mock/images";

export default axios => ({
	index(){
		return images;
	},
	get(id){
		return images.find( image => image.id === id);
	}
});
