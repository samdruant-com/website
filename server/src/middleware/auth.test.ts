describe('Auth Middleware', () => {
	describe('register', () => {
		it("should return 400 if username is not provided");
		it("should return 400 if password is not provided");
		it("should return 201 if user is created");
		it("should return the created user");
	});

	describe('login', () => {
		it("should return 400 if username is not provided");
		it("should return 400 if password is not provided");
		it("should return 401 if username is not found");
		it("should return 401 if password is incorrect");
		it("should return 200 if username and password are correct");
		it("should return the user and tokens (access and renew)");
		it("should generate access token with user id as payload");
		it("should generate renew token with access token as payload");
	});

	describe('verifyAccessToken', () => {
		it("should return 401 if auth token is missing");
		it("should return 401 if auth token is invalid");
		it("should return 401 if user is missing");
		it("should add the user to the request object");
	});

	describe('renewAccessToken', () => {
		it("should return 401 if tokens are missing");
		it("should return 401 if renew token is invalid");
		it("should return 401 if renew token payload does not match access token");
		it("should return 200 if renew token is valid");
		it("should return the user and new access and renew tokens");
	});
});