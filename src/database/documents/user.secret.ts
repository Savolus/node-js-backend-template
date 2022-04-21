import { Document, Types } from 'mongoose'

import { UserDocument } from './user'

export interface UserSecretDocument extends Document {
	email: string
	password: string
	createdAt: Date
	user: UserDocument | Types.ObjectId
}
