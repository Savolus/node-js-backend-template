export class HttpException {
	constructor(public readonly status: number, public readonly message: string, public readonly info: unknown = null) {}
}

export class BadRequestException extends HttpException {
	constructor(message: string) {
		super(400, message)
	}
}

export class UnauthorizedException extends HttpException {
	constructor(message: string) {
		super(401, message)
	}
}

export class ForbiddenException extends HttpException {
	constructor(message: string) {
		super(403, message)
	}
}

export class NotFoundException extends HttpException {
	constructor(message: string) {
		super(404, message)
	}
}

export class InternalServerErrorException extends HttpException {
	constructor(message: string, info: unknown = null) {
		super(500, message, info)
	}
}
