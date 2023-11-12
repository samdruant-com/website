/* eslint-disable @typescript-eslint/no-explicit-any */
import database from '../database';
import chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import { createUser } from './user';
import type { IUser } from '../types/index';

const GENERIC_USER: IUser = {
	username: "test",
	password: "test"
};

chai.use(ChaiAsPromised);
const expect = chai.expect;

describe("User Data", () => {
	before(async () => {
		await database.connect();
	});

	after(async () => {
		await database.drop();
		await database.disconnect();
	});

	describe("createUser", () => {
		afterEach(async () => {
			await database.drop();
		});
  
		it("should return a user", async () => {
			const user = await createUser({ username: GENERIC_USER.username, password: GENERIC_USER.password });
			expect(user).to.be.an("object");
			expect(user).to.have.property("username");
			expect(user).to.have.property("password");
		});

		it("should throw an error if username is not provided", async () => {
			const missingUsername = createUser({ username: null as any, password: GENERIC_USER.password });
			expect(missingUsername).to.eventually.throw;
		});

		it("should throw an error if username is not unique", async () => {
			await createUser({ username: GENERIC_USER.username, password: GENERIC_USER.password });
			const duplicateUser = createUser({ username: GENERIC_USER.username, password: GENERIC_USER.password });
			expect(duplicateUser).to.eventually.throw;
		});

		it("should throw an error if password is not provided", async () => {
			const missingPassword = createUser({ username: GENERIC_USER.username, password: null as any });
			expect(missingPassword).to.eventually.throw;
		});

		it("should convert plain text password to a hashed password", async () => {
			const user = await createUser({ username: GENERIC_USER.username, password: GENERIC_USER.password }, { secrets: true });
			expect(user).to.have.property("password");
			expect(user.password).to.not.equal(GENERIC_USER.password);
		});

		it("should insert salt into the user document", async () => {
			const user = await createUser({ username: GENERIC_USER.username, password: GENERIC_USER.password }, { secrets: true });
			expect(user).to.have.property("salt");
		});
	});

	describe("getUserById", () => {
		it("should throw an error if id is not provided");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("getUserByUsername", () => {
		it("should throw an error if username is not provided");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("indexUsers", () => {
		it("should return an array of users");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("updateUser", () => {
		it("should throw an error if id is not provided");
		it("should not change properties that are not provided in the update object");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("deleteUser", () => {
		it("should throw an error if id is not provided");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});
});