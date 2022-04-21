import { Document, Types } from 'mongoose'

import { UserSecretDocument } from './user.secret'

export interface TokenDocument extends Document {
	accessToken: string
	refreshToken: string
	createdAt: Date
	userSecret: UserSecretDocument | Types.ObjectId
}
