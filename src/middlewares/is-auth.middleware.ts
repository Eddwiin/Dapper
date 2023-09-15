import { type NextFunction, type Request, type Response } from 'express'
import { Error } from 'mongoose'
import { handleUnauthorized } from './../utils/errors-response.util'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.isLoggedIn === undefined) throw new Error('Not logged!')
    else next()
  } catch (error: unknown) {
    handleUnauthorized(error, next)
  }
}

export default isAuth
