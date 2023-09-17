/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type NextFunction, type Request, type Response } from 'express'
import { ROUTE_PATH } from '../configs/route-path.config'
import BookController from '../controllers/book/book.controller'
import clearHashMiddleware from '../middlewares/clear-cache.middleware'
import isAuth from '../middlewares/is-auth.middleware'
import { authorValidator, descriptionValidator, idValidator, priceValidator, titleValidator } from '../validators/book.validator'

const bookRouter = Router()
const bookController = new BookController()

bookRouter.get(ROUTE_PATH.BOOK.ALL, async (req, res, next) => await bookController.getAll(req, res, next))

bookRouter.get(ROUTE_PATH.BOOK.GETBYID, async (req, res, next) => await bookController.getBookById(req, res, next))

bookRouter.post(
  ROUTE_PATH.BOOK.SAVE,
  clearHashMiddleware,
  [
    titleValidator,
    priceValidator,
    descriptionValidator,
    authorValidator
  ],
  async (req: Request, res: Response, next: NextFunction) => { await bookController.save(req, res, next) })

bookRouter.put(
  ROUTE_PATH.BOOK.UPDATE,
  isAuth,
  clearHashMiddleware,
  [
    idValidator,
    titleValidator,
    priceValidator,
    descriptionValidator,
    authorValidator
  ],
  async (req: Request, res: Response, next: NextFunction) => await bookController.update(req, res, next))

bookRouter.delete(ROUTE_PATH.BOOK.DELETE, clearHashMiddleware, async (req, res, next) => await bookController.delete(req, res, next))

export default bookRouter
