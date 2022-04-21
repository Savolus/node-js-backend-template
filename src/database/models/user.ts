import { model } from 'mongoose'

import { UserDocument } from '../documents'
import { UserSchema } from '../schemas'

export const UserModel = model<UserDocument>('user', UserSchema)
