import { type NextFunction } from 'express'
import { type ValidationError } from 'express-validator'
import { type Error } from 'mongoose'

export enum HttpStatusCode {
  BadRequest = '400',
  ServerError = '500',
  NotFound = '404',
  NotAuthorized = '401',
  UnprocessableEntity = '422'
}

export const handleServerError = (error: unknown, next: NextFunction) => {
  (error as Error).name = HttpStatusCode.ServerError
  next(error)
}

export const handleValidationFieldError = (error: unknown, message: ValidationError[], next: NextFunction) => {
  (error as Error).name = HttpStatusCode.BadRequest;
  (error as any).message = message
  next(error)
}

export const handleUnauthorized = (error: unknown, next: NextFunction) => {
  (error as Error).name = HttpStatusCode.NotAuthorized
  next(error)
}

export const handleNotFound = (error: unknown, next: NextFunction) => {
  (error as Error).name = HttpStatusCode.NotFound
  next(error)
}

export const handleBadRequest = (error: unknown, next: NextFunction) => {
  (error as Error).name = HttpStatusCode.BadRequest
  next(error)
}
