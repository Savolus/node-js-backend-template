import { Schema, Types } from 'mongoose'

import { UserSecretDocument } from '../documents'

export const UserSecretSchema = new Schema<UserSecretDocument>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		createdAt: Date,
		user: { type: Types.ObjectId, required: true },
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	},
)
