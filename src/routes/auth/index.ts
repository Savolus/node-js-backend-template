import { Router } from 'express'

import { auth } from '../../controllers'

export default Router()
	.post('/register', auth.register)
	.post('/login', auth.login)
	.post('/logout', auth.logout)
	.post('/refreshToken', auth.refreshToken)
