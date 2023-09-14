import { type BookWithoutId, type IBook } from '../interfaces/book.interface'
import { BookModel } from '../models/book.model'
import { PaginationService } from './pagination.service'

export class BookService {
  async getAll (page: number, itemPerPage: number) {
    return await BookModel.countDocuments().then(async (items) => {
      const paginationService = new PaginationService(page, itemPerPage, items)
      const paginationResults = paginationService.getPagination()
      const books = await BookModel.find().skip(paginationResults.elementToSkip).limit(itemPerPage)

      return { books, ...paginationResults }
    })
  }

  getById (id: string) {
    return BookModel.findById(id)
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
