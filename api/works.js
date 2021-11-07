import MockWorks from "./mock/works";
import MockImages from "./mock/images";

function getWorkImages(work){
	if(!work) return [];

	const images = [];

	for(let i = 0; i < work.images.length; i++){
		const imageId = work.images[i];
		const image = MockImages.find((item) => { item.id === imageId;});

		images.push(image);
	}

	return images;
}

export default axios => ({
	index(){
		return MockWorks.map((work) => {
			const images = getWorkImages(work);
			work.images = images;

			return { data: work };
		});
	},
	get(id){
		const work = MockWorks.find( work => work.id === Number(id));
		const images = getWorkImages(work);
		work.images = images;

		return { data: work };
	}
});
