import { UserDocument } from '../database/documents'

declare global {
	namespace Express {
		interface Request {
			user: UserDocument
			accessToken: string
			refreshToken: string
		}
	}
}

export {}
