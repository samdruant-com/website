import MockHelper from "./mock/helper";
import MockWorks from "./mock/works";

export default axios => ({
	index(){
		return MockWorks().map((work) => {
			const images = MockHelper.populateWorkImages(work);
			work.images = images;

			return { data: work };
		});
	},
	get(id){
		const work = MockWorks().find( work => work._id === Number(id));
		const images = MockHelper.populateWorkImages(work);
		work.images = images;

		return { data: work };
	}
});
