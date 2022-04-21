import { ErrorRequestHandler } from 'express'

import { HttpException, InternalServerError } from '../errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorHandler: ErrorRequestHandler = (error: HttpException, _req, res, _next) => {
	if (error instanceof Error) error = InternalServerError(error)
	res.status(error.status).json(error)
}
