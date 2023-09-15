import { type NextFunction, type Request, type Response } from 'express'
import { clearHash } from './../services/cache.service'

const clearHashMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  next()
  await clearHash(req.body.id)
}

export default clearHashMiddleware
