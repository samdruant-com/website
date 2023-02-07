import MockWorks from "./works";
import MockImages from "./images";

export default {
	populateProjectWorks(project){
		if(!project) return [];

		const works = [];

		for(let i = 0; i < project.works.length; i++){
			const workId = project.works[i];

			const work = MockWorks().find((item) => {
				return item._id === Number(workId);
			});

			works.push(work);
		}

		return works;
	},
	populateWorkImages(work){
		if(!work) return [];

		const images = [];

		for(let i = 0; i < work.images.length; i++){
			const imageId = work.images[i];
			const image = MockImages().find((item) => item._id === Number(imageId));
			images.push(image);
		}

		return images;
	}
};
