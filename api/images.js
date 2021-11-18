import MockImages from "./mock/images";

export default {
	index() {
		return { data: MockImages() };
	},
	get(id) {
		const image = MockImages().find(image => image._id === Number(id));
		return { data: image };
	}
};
