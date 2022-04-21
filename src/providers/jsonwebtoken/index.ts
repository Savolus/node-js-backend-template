import { sign, decode, verify, SignOptions, TokenExpiredError } from 'jsonwebtoken'

import { TokenExpired, TokenForbidden } from '../../errors'
import { JwtToken, JwtTokenPayload } from '../../types'
import config from '../../config'

export const jwt = {
	sign: (payload: JwtTokenPayload, options: SignOptions) => sign(payload, config.jwt.secret, options),
	decode: (token: string): Promise<JwtToken> => decode(token) as Promise<JwtToken>,
	verify: (token: string): Promise<JwtToken> => {
		try {
			return verify(token, config.jwt.secret) as Promise<JwtToken>
		} catch (error) {
			if (error instanceof TokenExpiredError) throw TokenExpired
			else throw TokenForbidden
		}
	},
}
