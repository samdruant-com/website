import MockImages from "./images";
import type { Work, Image } from "~/types";

const works = [
	{
		_id: 0,
		name: "FUK U",
		date: 2021,
		size: "1m70 x 2m10",
		material: "Handgun tufted (cut pile), knitted & embroidery with wool & various yarns",
		images: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
	},
	{
		_id: 1,
		name: "A SMALL POND",
		date: 2021,
		size: "2m70 x 2m",
		material: "Handgun tufted (loop + cut pile) with 100% wool + Eco Latex backing",
		images: [12, 13]
	},
	{
		_id: 2,
		name: "A WALK IN THE PARK",
		date: 2021,
		size: "1m x 2m20",
		material: "Handgun tufted (loop + cut pile) with 75% wool & 25% various yarns",
		images: [42, 43, 44]
	},
	{
		_id: 3,
		name: "I <3 PATRIACHY",
		date: 2021,
		size: "50cm x 70cm",
		material: "Handwoven Jacquard with various yarns",
		images: [31]
	},
	{
		_id: 4,
		name: "PLAYERSLAYER",
		date: 2021,
		size: "40cm x 70cm",
		material: "Handwoven Jacquard with various yarns",
		images: [38]
	},
	{
		_id: 5,
		name: "YUM",
		date: 2021,
		size: "40cm x 70cm",
		material: "Handwoven Jacquard with various yarns",
		images: [45]
	},
	{
		_id: 6,
		name: "WIFEY 4 LIFEY",
		date: 2021,
		size: "70cm x 100cm",
		material: "Handwoven Jacquard with various yarns",
		images: [41]
	},
	{
		_id: 7,
		name: "NIGHTY NIGHT",
		date: 2021,
		size: "2m20 x 1m70",
		material: "Jacquard woven with 75% natural fiber yarns 25% acrylic fiber yarns",
		images: [36, 37]
	},
	{
		_id: 8,
		name: "DRAGONS Justine Grillet x Sam Druant",
		date: 2021,
		size: "+/- 2m20 x 1m60",
		material: "Tufted with wool and various yarn",
		images: [0, 1]
	},
	{
		_id: 9,
		name: "FIRE LAMB Justine Grillet x Sam Druant",
		date: 2021,
		size: "+/- 2m20 x 1m50",
		material: "Tufted with wool and various yarn",
		images: [19]
	},
	{
		_id: 10,
		name: "FUN 1 Justine Grillet x Sam Druant",
		date: 2021,
		size: "+/- 1m50 x 1m",
		material: "Tufted with wool and various yarn",
		images: [2, 3, 4]
	},
	{
		_id: 11,
		name: "KANGA & RAMGASKAN Justine Grillet x Sam Druant",
		date: 2021,
		size: "+/- 1m1 x 55cm",
		material: "Tufted with wool and various yarn",
		images: [32]
	},
	{
		_id: 12,
		name: "SNAKE Justine Grillet x Sam Druant",
		date: 2021,
		size: "unknown",
		material: "Tufted with wool and various yarn",
		images: [8, 9]
	},
	{
		_id: 13,
		name: "FUN 2 Justine Grillet x Sam Druant",
		date: 2021,
		size: "+/- 1m x 1m20",
		material: "Plasma burned metal plate",
		images: [5, 6, 7]
	},
	{
		_id: 14,
		name: "THE KISS",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [39]
	},
	{
		_id: 15,
		name: "GAZING",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [30]
	},
	{
		_id: 16,
		name: "MOUNTAINS",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [48]
	},
	{
		_id: 17,
		name: "MILK&VODKA",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [34]
	},
	{
		_id: 18,
		name: "DANCE WITH ME",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [15]
	},
	{
		_id: 19,
		name: "DRINKS",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [18]
	},
	{
		_id: 20,
		name: "DISCODANCING",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [17]
	},
	{
		_id: 21,
		name: "DAY",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [16]
	},
	{
		_id: 22,
		name: "NIGHT",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [35]
	},
	{
		_id: 23,
		name: "LA SEDUCTION",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [33]
	},
	{
		_id: 24,
		name: "BITE ME",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [14]
	},
	{
		_id: 25,
		name: "WE JUST HAD FUN",
		date: 2021,
		size: "100cm x 60cm",
		material: "Tufted with wool",
		images: [40]
	},
	{
		_id: 26,
		name: "AND YOU",
		date: 2021,
		size: "100cm x 60cm",
		material: "Tufted with wool",
		images: [11]
	},
	{
		_id: 27,
		name: "777",
		date: 2019,
		size: "unkown",
		material: "Scraps",
		images: [10]
	}
];

export default function(): Work[] {
	const mockImages = MockImages();
  
  return [...works].map((work: any) => {
    // convert id to string
    work._id = work._id + "";
    // convert date to string
    work.date = work.date + "";
    
    // convert images to Image[]
    for(let i = 0; i < work.images.length; i++) {
      work.images[i] = mockImages.find((image: Image) => image._id == work.images[i] + "");
    }
    return work;
  })
}
