import { RequestHandler } from 'express'

import { Controller } from '../types'

export const applyErrorHandling =
	(handler: RequestHandler): RequestHandler =>
	(req, res, next) =>
		Promise.resolve(handler(req, res, next)).catch(next)

export const applyControllerErrorHandling = <T extends string>(controller: Controller<T>) =>
	Object.fromEntries(
		Object.entries(controller).map(([name, handler]) => [
			name as keyof Controller<T>,
			applyErrorHandling(handler as RequestHandler),
		]),
	)
