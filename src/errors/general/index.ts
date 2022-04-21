import { NotFoundException, InternalServerErrorException, UnauthorizedException, ForbiddenException } from '../base'

export const PageNotFound = new NotFoundException('Page not found.')

export const TokenRequired = new ForbiddenException('Token required.')

export const TokenExpired = new UnauthorizedException('Token expired.')

export const TokenForbidden = new ForbiddenException('Token forbidden.')

export const InternalServerError = (error: Error) => new InternalServerErrorException(error.message, error.stack)
