import { Document } from 'mongoose'

export interface UserDocument extends Document {
	firstName: string
	lastName: string
	fullName: string
	createdAt: Date
	avatar?: string
}
