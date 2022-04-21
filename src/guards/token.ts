import { RequestHandler } from 'express'

import { TokenExpired, TokenForbidden, TokenRequired, UserNotFound } from '../errors'
import { TokenModel, UserModel } from '../database/models'
import { TokenType } from '../types'
import { jwt } from '../providers'
import config from '../config'

const openRoutes = ['/', '/ping', `${config.server.prefix}/auth/register`, `${config.server.prefix}/auth/login`]
const refreshRoutes = [`${config.server.prefix}/auth/refreshToken`]

export const TokenGuard: RequestHandler = async (req, res, next) => {
	const { token: tokenString } = req.headers

	if (!tokenString) {
		if (openRoutes.includes(req.path)) return next()
		return next(TokenRequired)
	}

	try {
		const { type, sub } = await jwt.verify(tokenString as string)

		if (refreshRoutes.includes(req.path)) {
			if (type === TokenType.access) throw TokenForbidden
		} else {
			if (type === TokenType.refresh) throw TokenForbidden
		}

		const token = await TokenModel.findOne({
			[`${type}Token`]: tokenString,
		})

		if (!token) throw TokenExpired

		const user = await UserModel.findById(sub)

		if (!user) throw UserNotFound

		req.user = user
		req.accessToken = token.accessToken
		req.refreshToken = token.refreshToken

		return next()
	} catch (error) {
		return next(error)
	}
}
