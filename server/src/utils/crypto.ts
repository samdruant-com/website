import Jwt from "jsonwebtoken";
import Bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/env";

if(!JWT_SECRET) {
	throw new Error("Jwt secret not set. Set JWT_SECRET environment variable.");
}

/**
 * Returns a jwt token for the provided value
 * 
 * @param value - text to tokenize
 * @param config - config
 * @param config.expiresIn - expiration time in format: 1d, 1h, 1m, 1s (default: 24h)
 */
function setToken(value: string, config?: { expiresIn?: string }): string {
	
	const payload = { data: value };
	const signOptions = { expiresIn: config?.expiresIn || "24h" };

	return Jwt.sign(payload, JWT_SECRET, signOptions);
}

/**
 * Returns value of jwt token
 * 
 * @param token - token
 * @returns text or `null` if invalid
 */
function getToken(token: string): string | null {
	try {
		const result: Jwt.Jwt = Jwt.verify(token, JWT_SECRET, { complete: true });
    
		let value: string | null;
    
		if (!result) {
			value = null;
		} else if(typeof result.payload === "string"){
			value = result.payload;
		} else {
			value = result.payload.data;
		}
  
		return value;
	} catch (error) {
		return null;
	}

}

/**
 * Returns a hash of a value
 * 
 * @param value - plain text password
 * @param config config
 * @param config.saltRounds - salt rounds (default: 10)
 * @returns hash
 */
function hashPassword(value: string, config?: { saltRounds?: number }): string {
	const saltRounds = config?.saltRounds || 10;
	return Bcrypt.hashSync(value, saltRounds);
}

/**
 * Returns true if sample matches hash
 * 
 * @param sample - plain text password
 * @param hash - hashed plain text password
 */
function comparePasswords(sample: string, hash: string): boolean {
	return Bcrypt.compareSync(sample, hash);
}

export {
	setToken,
	getToken,
	hashPassword,
	comparePasswords
};