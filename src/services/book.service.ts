import { type IBook } from '../interfaces/book.interface'
import { BookModel } from '../models/book.model'
export class BookService {
  async getAll () {
    return await BookModel.find()
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

  async save (book: Omit<IBook, 'id'>) {
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
