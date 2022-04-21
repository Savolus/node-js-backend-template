import { Schema, Types } from 'mongoose'

import { TokenDocument } from '../documents'

export const TokenSchema = new Schema<TokenDocument>(
	{
		accessToken: { type: String, required: true },
		refreshToken: { type: String, required: true },
		createdAt: Date,
		userSecret: { type: Types.ObjectId, required: true },
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	},
)
