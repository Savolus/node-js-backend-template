import { model } from 'mongoose'

import { UserSecretDocument } from '../documents'
import { UserSecretSchema } from '../schemas'

export const UserSecretModel = model<UserSecretDocument>('user.secret', UserSecretSchema)
