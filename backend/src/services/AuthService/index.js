import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminData from "../../data/AdminData.js";
import { IAuth } from "./IAuth.js";
import { EnvConfig } from "../../config/index.js";
import { GeneralError } from "../../logic/ErrorLogic.js";

const { AUTH_JWT_EXPIRE, AUTH_JWT_SECRET } = EnvConfig;

/**
 * Doubles the time of the token expiration without changing the unit
 *
 * @param {string} expiresIn
 * @returns {string} expiresIn
 */
function doubleTokenExpiration(expiresIn){
	// get time and unit
	const number = parseInt(expiresIn.match(/(\d+)/)[0]);
	const unit = expiresIn.match(/([a-zA-Z]+)/)?.shift() || null;
	// double the time
	const double = number * 2;
	// return the new string
	return unit ? `${double}${unit}` : double;
}

const crypto = {
	hash(password){
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	},
	compare(password, hash){
		if(!password || !hash) return false;
		return bcrypt.compareSync(password, hash);
	},
	/**
	 * 
	 * @param {object} credentials
	 * @param {string} credentials.data
	 * @param {string} credentials.secret
	 * @param {string} credentials.expire
	 * @returns {string} token
	 */
	generateToken({ data, secret, expire } = {}){
		expire = expire || AUTH_JWT_EXPIRE;
		secret = secret || AUTH_JWT_SECRET;

		try {
			return jwt.sign(
				{ data }, 
				secret, 
				{ expiresIn: expire }
			);
		}
		catch (error) {
			throw new GeneralError(error, 400);
		}
	},
	/**
	 * 
	 * @param {object} credentials
	 * @param {string} credentials.token
	 * @param {string} credentials.secret
	 * @returns {jwt.Jwt} decoded token
	 */
	verifyToken({ token, secret } = {}){
		try {
			secret = secret || AUTH_JWT_SECRET;
			return jwt.verify(token, secret);
		}
		catch (error) {
			throw new GeneralError(error.message, 401);
		}
	}
};

class AuthService extends IAuth {
	constructor() {
		super();
	}

	hash(password) {
		return crypto.hash(password);
	}
  
	async login({ email, password } = {}) {
		let admin = undefined;
    
		try {
			admin = await AdminData.getAdminByEmail(email, { secret: true });
		}
		catch (error) {
			if(error.statusCode === 404){
				throw new GeneralError("Invalid credentials", 401);
			}
		}
		
		if(!crypto.compare(password, admin.password)) {
			throw new GeneralError("Invalid credentials", 401);
		}
		
		const accessToken = crypto.generateToken({ data: admin.id });
		const refreshToken = crypto.generateToken({ data: accessToken, secret: admin.password, expire: doubleTokenExpiration(AUTH_JWT_EXPIRE) });
    
		// remove password from response
		admin.password = undefined;

		return { admin, tokens: { accessToken, refreshToken } };
	}

	async authenticate(accessToken){
		const decoded = crypto.verifyToken({ token: accessToken });
		const id = decoded.data;
		
		if(!id){
			throw new GeneralError("Invalid token", 401);
		}
    
		try {
			return await AdminData.getAdmin(id, { secret: true });
		}
		catch (error) {
			if(error.statusCode === 404){
				throw new GeneralError("Invalid token", 401);
			}
		} 
	}

	refresh(accessToken, refreshToken) {
		let decodedAccessToken;
		try {
			decodedAccessToken = crypto.verifyToken({ token: accessToken });
		}
		catch (error) {
			throw new GeneralError("Invalid access token", 401);
		}
    
		const admin = AdminData.getAdmin(decodedAccessToken.id, { secret: true });
		const decodedRefreshToken = crypto.verifyToken({ token: refreshToken, secret: admin.password });

		if(decodedRefreshToken.payload !== accessToken){
			throw new Error("Invalid session tokens", 401);
		}

		const newAccessToken = crypto.generateToken({ data: admin.id });
		const newRefreshToken = crypto.generateToken({ data: newAccessToken, secret: admin.password, expire: doubleTokenExpiration(AUTH_JWT_EXPIRE) });

		// remove password from response
		admin.password = undefined;

		return { admin, tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken } };
	}
}

export default new AuthService();