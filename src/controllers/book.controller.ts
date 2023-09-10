import { type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { BookService } from '../services/book.service'
import { returnErrorsStatus } from '../utils/errors-response.util'

type RequestParams = { id: string }

export default class BookController {
  private readonly bookService = new BookService()

  async getAll (req: Request, res: Response) {
    return await this.bookService.getAll()
      .then((books) => res.status(200).send(books))
  }

  async getBookById (req: Request, res: Response) {
    const { id } = req.params as RequestParams

    return await this.bookService.getById(id).then((book) => res.status(200).send(book))
  }

  async update (req: Request, res: Response) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return returnErrorsStatus(res, errors)

    return await this.bookService.update(req.body)
      .then((result: any) => res.status(200).send(result))
      .catch(err => { console.error(err) })
  }

  async save (req: Request, res: Response) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return returnErrorsStatus(res, errors)

    return await this.bookService.save(req.body)
      .then((result) => res.status(200).send(result))
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params as RequestParams

    return await this.bookService.delete(id)
      .then((result) => res.status(200).send(result))
      .catch(err => { console.log('ERREUR', err) })
  }
}
