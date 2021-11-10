const projects = [
	{
		_id: 0,
		name: "Bite Me",
		date: 2021,
		works: [0, 1, 2, 3, 4, 5, 6, 7]
	},
	{
		_id: 1,
		name: "We Just Had Fun",
		date: 2021,
		works: [8, 9, 10, 11, 12, 13, 25, 26]
	},
	{
		_id: 2,
		name: "Scraps",
		date: 2019,
		works: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27]
	}
];

export default function(){
	return JSON.parse(JSON.stringify(projects));
}
