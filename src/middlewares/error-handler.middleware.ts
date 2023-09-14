import { type NextFunction, type Request, type Response } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(Number(err.name)).json({
    errors: err.message
  })
}

export default errorHandler
