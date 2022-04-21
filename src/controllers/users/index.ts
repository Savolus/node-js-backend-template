import { applyControllerErrorHandling } from '../../decorators'
import { UserModel } from '../../database/models'
import { UserNotFound } from '../../errors'
import { Controller } from '../../types'

type Handlers = 'getUser' | 'getUsers' | 'createUser' | 'updateUser' | 'deleteUser'

const userController: Controller<Handlers> = {
	getUser: async (req, res) => {
		const userModel = await UserModel.findById(req.params.id)
		if (!userModel) throw UserNotFound
		res.json(userModel)
	},

	getUsers: async (req, res) => {
		const userModels = await UserModel.find(req.body)
		res.json(userModels)
	},

	createUser: async (req, res) => {
		const userModel = new UserModel(req.body)
		await userModel.save()
		res.json(userModel)
	},

	updateUser: async (req, res) => {
		const userModel = await UserModel.findById(req.params.id)
		if (!userModel) throw UserNotFound
		await userModel.update(req.body)
		res.json(userModel)
	},

	deleteUser: async (req, res) => {
		const userModel = await UserModel.findById(req.params.id)
		if (!userModel) throw UserNotFound
		await userModel.remove()
		res.json(userModel)
	},
}

export const users = applyControllerErrorHandling<Handlers>(userController) as Controller<Handlers>
