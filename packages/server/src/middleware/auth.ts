import * as UserData from "../data/user";
import { setToken, getToken, comparePasswords } from "../utils/crypto";
import { createErrorResponse } from "./helpers/error";
import { ADMIN_SECRET } from "../config/env";
import type { UserDocument } from "../data/user";
import type { AuthenticatedRequest } from "./helpers/types";
import type { Request, Response, NextFunction } from "express";

/**
 * Generates a pair of access and refresh tokens from a user id.
 * 
 * - access token is derived from the user's id and expires after 24 hours
 * - refresh token is derived from the access token and expires after 7 days
 */
function _generateTokens(userId: string): { accessToken: string, refreshToken: string } {
	if(!userId){
		throw new Error('Missing user id.');
	}
  
	const accessToken: string = setToken(userId, { expiresIn: "24h" });
	const refreshToken: string = setToken(accessToken, { expiresIn: "7d" });

	return { accessToken, refreshToken };
}

/**
 * Returns a user from a token if the token is valid.
 */
async function _decodeToken(token: string): Promise<UserDocument> {
	const decodedToken: string | null = getToken(token);
	if(!decodedToken){
		throw new Error('Invalid auth token.');
	}
  
	const user: UserDocument | null = await UserData.getUserById(decodedToken);
	if(!user){
		throw new Error(`User with id ${decodedToken} missing.`);
	}

	return user;
}

/**
 * Returns a user and a pair of access and refresh tokens if created successfully.
 */
async function register(req: Request, res: Response) {
	const { username, password, secret } = req.body;

	if(secret !== ADMIN_SECRET){
		return createErrorResponse(res, 'Invalid admin secret.', 401);
	}
  
	try {
		const user = await UserData.createUser(username, password);
		const { accessToken, refreshToken } = _generateTokens(user._id);
    
		return res.status(201).send({ user, accessToken, refreshToken });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

/**
 * Returns a user and a pair of access and refresh tokens is username and password are valid.
 * 
 * The access token is derived from the user's id and expires after 24 hours and the refresh
 * token is derived from the access token and expires after 7 days.
 */
async function login(req: Request, res: Response) {
	const { username, password } = req.body;
  
	const user: UserDocument | null = await UserData.getUserByUsername(username, { secrets: true });
	if(!user){
		return createErrorResponse(res, 'Invalid authentication credentials.', 401);
	}
  
	const match = comparePasswords(password, user?.password);
	if (!match) {
		return createErrorResponse(res, 'Invalid authentication credentials.', 401);
	}

	try {
		// remove password from user object
		user.password = "";
    
		const { accessToken, refreshToken } = _generateTokens(user._id);
		return res.status(200).send({ user, accessToken, refreshToken });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 500);
	}
}

/**
 * Middleware function that requires authentication for a request. Adds user object to request if
 * token is valid, otherwise returns an error response and does not continue to next middleware.
 */
async function requireAuthentication(req: Request, res: Response, next: NextFunction) {
	const requestToken: string | undefined = req.headers?.authorization?.split(" ")[1];
	if(!requestToken){
		return createErrorResponse(res, 'Missing auth token.', 401);
	}

	let user: UserDocument;
  
	try {
		user = await _decodeToken(requestToken);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 401); 
	}
	
	(req as AuthenticatedRequest).user = user;
	return next();
}

/**
 * Middleware function to accept authentication. Adds user object to request if token is valid,
 * otherwise continues to next middleware.
 */
async function acceptAuthentication(req: Request, res: Response, next: NextFunction) {
	const requestToken: string | undefined = req.headers?.authorization?.split(" ")[1];
	if(!requestToken){
		return next();
	}

	let user: UserDocument;
  
	try {
		user = await _decodeToken(requestToken);
	} catch (error) {
		return next();
	}
	
	(req as AuthenticatedRequest).user = user;
	return next();
}

/**
 * Returns a new access and refresh token if the refresh token is valid.
 */
async function refreshAccessToken(req: Request, res: Response) {
	const { accessToken, refreshToken } = req.body;

	if(!accessToken || !refreshToken) {
		return createErrorResponse(res, 'Missing tokens.', 401);
	}

	const originalAccessToken: string | null = getToken(refreshToken);
	if(!originalAccessToken){
		return createErrorResponse(res, 'Invalid refresh token.', 401);
	}

	if(originalAccessToken !== accessToken){
		return createErrorResponse(res, 'Access token does not match original.', 401);
	}

	const userId: string | null = getToken(originalAccessToken);
	if(!userId){
		return createErrorResponse(res, 'Invalid access token.', 401);
	}

	const user: UserDocument | null = await UserData.getUserById(userId);
	if(!user){
		return createErrorResponse(res, `User with id ${userId} missing.`, 401);
	}

	try {
		const { accessToken, refreshToken } = _generateTokens(user._id);
		return res.status(200).send({ accessToken, refreshToken });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 500);
	}
}

export {
	register,
	login,
	requireAuthentication,
	acceptAuthentication,
	refreshAccessToken
};
