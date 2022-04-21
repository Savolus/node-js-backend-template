import { Router } from 'express'

import { users } from '../../controllers'

export default Router()
	.get('/:id', users.getUser)
	.get('/', users.getUsers)
	.post('/', users.createUser)
	.patch('/:id', users.updateUser)
	.delete('/:id', users.deleteUser)
