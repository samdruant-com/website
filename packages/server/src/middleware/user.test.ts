describe('User Middleware', () => {
	describe('getUserByUsername', () => {
		it("should return 400 if username is not provided");
		it("should return 200 if user is found");
		it("should return the found user");
	});

	describe('indexUsers', () => {
		it("should return 200 if users are found");
		it("should return an array of users");
	});

	describe('patchUser', () => {
		it("should return 400 if id is not provided");
		it("should return 401 if authenticated user (req.user) is not the same as the user being updated (req.params.id)");
		it("should return 200 if user is updated");
		it("should return the updated user");
	});

	describe('deleteUser', () => {
		it("should return 400 if id is not provided");
		it("should return 401 if authenticated user (req.user) is not the same as the user being deleted (req.params.id)");
		it("should return 200 if user is deleted");
		it("should return the deleted user");
	});
});