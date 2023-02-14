import DayJs from "dayjs";

export default {
	format(date, format = "YYYY-MM-DD") {
		return DayJs(date).format(format);
	},
	getISODate(date) {
		return DayJs(date).toISOString();
	}
};
