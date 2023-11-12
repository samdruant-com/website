import Mongoose from "mongoose";
import { hashPassword } from "../utils/crypto";
import type { IUser } from "../types";

const GENERIC_PROJECTION = "-password";

type UserDocument = IUser & Mongoose.Document;

const UserModel = Mongoose.model("user", new Mongoose.Schema<IUser>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String }
	},
	{ timestamps: true })
	.pre("save", async function(next) {
		if(this.isModified("password")) {
			const hash: string = hashPassword(this.password);
			this.password = hash;
		}
		next();
	})
);

async function createUser(user: IUser, config?: { secrets: boolean }): Promise<UserDocument> {
	if(await getUserByUsername(user.username)) {
		throw new Error(`User with username ${user.username} already exists`);
	}
  
	const newUser = await UserModel.create(new UserModel(user));

	if(config?.secrets !== true) {
		newUser.password = "";
	}

	return newUser;
}

async function getUserById(id: string, config?: { secrets: boolean}): Promise<UserDocument | null> {
	return config?.secrets 
		? await UserModel.findById(id).exec()
		: await UserModel.findById(id).select(GENERIC_PROJECTION).exec();
}

async function getUserByUsername(username: string, config?: { secrets: boolean}): Promise<UserDocument | null> {
	return config?.secrets
		? await UserModel.findOne({ username }).exec()
		: await UserModel.findOne({ username }).select(GENERIC_PROJECTION).exec();
}

async function indexUsers(config?: { secrets: boolean}): Promise<UserDocument[]> {
	return config?.secrets 
		? await UserModel.find().exec()
		: await UserModel.find().select(GENERIC_PROJECTION).exec();
}

async function updateUser(id: string, patch: Partial<IUser>, config?: { secrets: boolean}): Promise<UserDocument | null> {
	const user = await getUserById(id);

	if(!user){
		throw new Error(`User with id ${id} not found`);
	}

	user.username = patch.username || user.username;
	user.password = patch.password || user.password;
	user.avatar = patch.avatar || user.avatar;

	const patchedUser = await user.save();

	if(!config?.secrets) {
		patchedUser.password = "";
	}

	return patchedUser;
}

async function deleteUser (id: string): Promise<UserDocument | null> {
	const user = await getUserById(id);

	if(!user){
		throw new Error(`User with id ${id} not found`);
	}

	return await UserModel.findByIdAndDelete(user.id);
}

export { 
	UserDocument,
	UserModel,
	createUser,
	getUserById,
	getUserByUsername,
	indexUsers,
	updateUser,
	deleteUser
};
