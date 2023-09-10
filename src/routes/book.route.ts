/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { ROUTE_PATH } from '../configs/route-path.config'
import BookController from '../controllers/book.controller'
import isAuth from '../middlewares/is-auth.middleware'
import { authorValidator, descriptionValidator, idValidator, priceValidator, titleValidator } from '../validators/book.validator'

const bookRouter = Router()
const bookController = new BookController()

bookRouter.get(ROUTE_PATH.BOOK.ALL, async (req, res) => await bookController.getAll(req, res))

bookRouter.get(ROUTE_PATH.BOOK.GETBYID, async (req, res) => await bookController.getBookById(req, res))

bookRouter.post(
  ROUTE_PATH.BOOK.SAVE,
  [
    titleValidator,
    priceValidator,
    descriptionValidator,
    authorValidator
  ],
  async (req: Request, res: Response) => await bookController.save(req, res))

bookRouter.put(
  ROUTE_PATH.BOOK.UPDATE,
  isAuth,
  [
    idValidator,
    titleValidator,
    priceValidator,
    descriptionValidator,
    authorValidator
  ],
  async (req: Request, res: Response) => await bookController.update(req, res))

bookRouter.delete(ROUTE_PATH.BOOK.DELETE, async (req, res) => await bookController.delete(req, res))

export default bookRouter
