import { RequestHandler } from 'express'

export const Logger: RequestHandler = (req, _res, next) => {
	console.info(`${req.method} ${req.path}`)
	return next()
}
