export class GeneralError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
	}
}

export class DataError extends GeneralError {
	constructor(message, statusCode) {
		super(message, statusCode);
		this.message = message;
		this.statusCode = statusCode;
	}
}
