import { RequestHandler } from 'express'

export type Controller<Handlers extends string> = Readonly<Required<Record<Handlers, RequestHandler>>>

export enum TokenType {
	access = 'access',
	refresh = 'refresh',
}

export interface JwtToken {
	readonly type: TokenType
	readonly iat: number
	readonly exp: number
	readonly sub: string
}

export type JwtTokenPayload = Pick<JwtToken, 'type'>
