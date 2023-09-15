import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import { BookService } from '../services/book.service'
import { clearHash } from '../services/cache.service'
import { handleBadRequest, handleNotFound, handleServerError, handleValidationFieldError } from '../utils/errors-response.util'

type RequestParams = { id: string }

export default class BookController {
  private readonly bookService = new BookService()
  private readonly itemPerPage = 2

  async getAll (req: Request, res: Response, next: NextFunction) {
    const page = req.query.page !== undefined ? Number(req.query.page) : 1

    return await this.bookService.getAll(page, this.itemPerPage)
      .then((result) => res.status(200).json(
        {
          response: result.books,
          totalItem: result.totalItems,
          hasNextPage: result.hasNextPage,
          hasPreviousPage: result.hasPreviousPage,
          nextPage: result.nextPage,
          previousPage: result.previousPage,
          lastPage: result.lastPage
        }))
      .catch((err: Error) => { handleServerError(err, next) })
  }

  async getBookById (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as RequestParams

    try {
      if (!isValidObjectId(id)) {
        const error = new Error('Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer')
        handleBadRequest(error, next); return
      }

      const book = await this.bookService.getById(id)
      if (book === null) { handleNotFound(new Error('Book not found!'), next); return }

      return res.status(200).json({ response: book })
    } catch (error) {
      handleServerError(error, next)
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    try {
      if (!errors.isEmpty()) throw new Error('Invalid fields')
    } catch (error: unknown) {
      handleValidationFieldError(error, errors.array(), next)
      return
    }

    return await this.bookService.update(req.body)
      .then((result: any) => res.status(200).json({ response: result }))
      .catch((err: Error) => { handleServerError(err, next) })
  }

  async save (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    try {
      if (!errors.isEmpty()) throw new Error('Invalid fields')
    } catch (error: unknown) {
      handleValidationFieldError(error, errors.array(), next)
      return
    }

    await this.bookService.save(req.body)
      .then(async (result) => {
        res.status(200).send(result)
        await clearHash(result.id)
      })
      .catch((err: Error) => { handleServerError(err, next) })
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as RequestParams

    return await this.bookService.delete(id)
      .then((result) => res.status(200).send(result))
      .catch((err: Error) => { handleServerError(err, next) })
  }
}
