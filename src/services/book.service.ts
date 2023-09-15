import { ObjectId } from 'mongodb'
import { type BookWithoutId, type IBook } from '../interfaces/book.interface'
import { BookModel } from '../models/book.model'
import { PaginationService } from './pagination.service'

export class BookService {
  async getAll (page: number, itemPerPage: number) {
    const booksCount = await BookModel.countDocuments()
    const paginationService = new PaginationService(page, itemPerPage, booksCount)
    const paginationResults = paginationService.getPagination()
    const books = await BookModel.find().skip(paginationResults.elementToSkip).limit(itemPerPage).cache()
    const booksWithPagination = { books, ...paginationResults }

    return booksWithPagination
  }

  async getById (id: string) {
    const convertIdToObjectId = new ObjectId(id)

    return await BookModel.findById(convertIdToObjectId)
      .cache({ key: id })
  }

  update (book: IBook) {
    const options = { returnNewDocument: true }

    return BookModel.updateOne(
      { _id: book._id },
      {
        $set: {
          title: book.title,
          price: book.price,
          description: book.description,
          author: book.author
        }
      },
      options
    )
  }

  async save (book: BookWithoutId) {
    const newBook = new BookModel({
      title: book.title,
      price: book.price,
      description: book.description,
      author: book.author
    })

    return await newBook.save()
  }

  delete (id: string) {
    return BookModel.deleteOne(
      { _id: id }
    )
  }
}
