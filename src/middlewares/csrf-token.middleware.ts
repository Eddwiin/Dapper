import { type NextFunction, type Request, type Response } from 'express'

const csrfToken = (req: Request, res: Response, next: NextFunction) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next()
}

export default csrfToken
