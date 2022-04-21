import { Schema } from 'mongoose'

import { UserDocument } from '../documents'

export const UserSchema = new Schema<UserDocument>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		fullName: { type: String, required: true },
		createdAt: Date,
		avatar: String,
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	},
)
