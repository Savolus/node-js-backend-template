import { compare, hash } from 'bcryptjs'

import { TokenModel, UserModel, UserSecretModel } from '../../database/models'
import { InvalidPassword, TokenExpired, UserAlreadyRegistered, UserNotFound } from '../../errors'
import { applyControllerErrorHandling } from '../../decorators'
import { Controller, TokenType } from '../../types'
import { jwt } from '../../providers'
import config from '../../config'

type Handlers = 'register' | 'login' | 'logout' | 'refreshToken'

const authController: Controller<Handlers> = {
	register: async (req, res) => {
		const { email, password, firstName, lastName } = req.body

		const registeredUserSecret = await UserSecretModel.findOne({ email })

		if (registeredUserSecret) throw UserAlreadyRegistered

		const user = new UserModel({
			firstName,
			lastName,
			fullName: `${firstName} ${lastName}`,
		})

		await user.save()

		const userSecret = new UserSecretModel({
			_id: user.id,
			email,
			password: await hash(password, config.server.salt),
			user: user.id,
		})

		await userSecret.save()

		const accessToken = await jwt.sign(
			{
				type: TokenType.access,
			},
			{
				subject: userSecret.id,
				expiresIn: config.jwt.accessToken.expiresIn,
			},
		)

		const refreshToken = await jwt.sign(
			{
				type: TokenType.refresh,
			},
			{
				subject: userSecret.id,
				expiresIn: config.jwt.refreshToken.expiresIn,
			},
		)

		const token = new TokenModel({
			accessToken,
			refreshToken,
			userSecret: userSecret.id,
		})

		await token.save()

		res.json({
			accessToken,
			refreshToken,
		})
	},

	login: async (req, res) => {
		const { email, password } = req.body

		const userSecret = await UserSecretModel.findOne({ email })

		if (!userSecret) throw UserNotFound

		const isValid = await compare(password, userSecret.password)

		if (!isValid) throw InvalidPassword

		const accessToken = await jwt.sign(
			{
				type: TokenType.access,
			},
			{
				subject: userSecret.id,
				expiresIn: config.jwt.accessToken.expiresIn,
			},
		)

		const refreshToken = await jwt.sign(
			{
				type: TokenType.refresh,
			},
			{
				subject: userSecret.id,
				expiresIn: config.jwt.refreshToken.expiresIn,
			},
		)

		const token = new TokenModel({
			accessToken,
			refreshToken,
			userSecret: userSecret.id,
		})

		await token.save()

		res.json({
			accessToken,
			refreshToken,
		})
	},

	logout: async (req, res) => {
		const { shouldLogoutEverywhere } = req.body
		const { user, accessToken, refreshToken } = req

		if (shouldLogoutEverywhere) await TokenModel.deleteMany({ userSecret: user.id })
		else await TokenModel.deleteOne({ accessToken, refreshToken, userSecret: user.id })

		res.json()
	},

	refreshToken: async (req, res) => {
		const { token: refreshToken } = req.headers

		const token = await TokenModel.findOne({ refreshToken })

		if (!token) throw TokenExpired

		const accessToken = await jwt.sign(
			{
				type: TokenType.access,
			},
			{
				subject: token.userSecret.toString(),
				expiresIn: config.jwt.accessToken.expiresIn,
			},
		)

		token.accessToken = accessToken
		await token.save()

		res.json({
			accessToken,
			refreshToken,
		})
	},
}

export const auth = applyControllerErrorHandling<Handlers>(authController) as Controller<Handlers>
