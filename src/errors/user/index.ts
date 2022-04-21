import { NotFoundException, UnauthorizedException } from '../base'

export const UserNotFound = new NotFoundException('User not found.')

export const UserAlreadyRegistered = new UnauthorizedException('User already registered.')

export const InvalidPassword = new NotFoundException('Invalid password given.')
