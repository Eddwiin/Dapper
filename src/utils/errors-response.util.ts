import { type NextFunction } from 'express'
import { type ValidationError } from 'express-validator'
import { type Error } from 'mongoose'

export enum HttpStatusCode {
  ValidationError = '400',
  ServerError = '500',
  NotFound = '404',
  NotAuthorized = '401',
  UnprocessableEntity = '422'
}

export const handleServerError = (err: Error, next: NextFunction) => {
  err.name = HttpStatusCode.ServerError
  next(err)
}

export const handleValidationFieldError = (error: unknown, message: ValidationError[], next: NextFunction) => {
  (error as Error).name = HttpStatusCode.UnprocessableEntity;
  (error as any).message = message
  next(error)
}

export const handleUnauthorized = (error: unknown, next: NextFunction) => {
  (error as Error).name = HttpStatusCode.NotAuthorized
  next(error)
}
