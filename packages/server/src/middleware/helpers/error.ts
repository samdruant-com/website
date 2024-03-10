import type { Response } from "express";

function createErrorResponse(res: Response, message: string, status: number): Response {
	return res.status(status).send(message);
}

export { createErrorResponse };
