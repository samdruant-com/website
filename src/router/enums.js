/**
 * Returns router names
 */
const ROUTES = {
	// public
	user:{
		landing: "landing",
		resume: "resume",
		articleList: "article-list",
		articleSingle: "article-single"
	},
	//admin
	admin: {
		profile:"admin-user",
		bio:"admin-bio",
		experiences:"admin-experiences",
		experienceCreate:"admin-experience-create",
		experienceUpdate:"admin-experience-update",
		articles: "admin-articles",
		articleCreate: "admin-article-create",
		articleUpdate: "admin-article-update",
	},
	//other
	auth:{
		login:"login",
		register: "register"
	},
	missing: "404",
};

export default ROUTES;
