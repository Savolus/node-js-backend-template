import { model } from 'mongoose'

import { TokenDocument } from '../documents'
import { TokenSchema } from '../schemas'

export const TokenModel = model<TokenDocument>('token', TokenSchema)
