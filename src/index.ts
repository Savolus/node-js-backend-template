import express, { Router } from 'express'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import cors from 'cors'

import { ErrorHandler, Logger } from './middlewares'
import { PageNotFound } from './errors'
import { TokenGuard } from './guards'
import routes from './routes'
import config from './config'

const app = express()
const api = Router()

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(Logger)
app.use(TokenGuard)

api.use('/auth', routes.auth)
api.use('/users', routes.users)

app.use(config.server.prefix, api)

app.get('/', (_req, res) =>
	res.json({
		message: 'api server is running',
	}),
)

app.get('/ping', (_req, res) => {
	res.json({
		message: 'pong',
	})
})

app.all('*', (_req, _res, next) => next(PageNotFound))

app.use(ErrorHandler)

const main = async () => {
	const server = await app.listen(config.server.port)

	console.log('Server started on port:', config.server.port)
	console.log('API prefix:', config.server.prefix)

	const io = new Server(server)

	io.on('connection', (socket) => {
		console.log(socket)
	})

	await connect(config.db.uri)

	console.log('MongoDB successfully connected.')
}

main()
