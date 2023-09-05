import { IBook } from "../../interfaces/book.interface";
import { IRepository } from "../../interfaces/repository.interface";
import BookModel from "../../models/mysql/book.model";

export class MysqlBookRepository implements IRepository<IBook> {
    getAll() {
        return BookModel.findAll();    
    }

    getById(idBook: string) {
        return BookModel.findByPk(idBook)
    }
    
    async save(book: Omit<IBook,'id'>) {
        const newBook = BookModel.build({
            title: book.title,
            price: book.price,
            description: book.description,
            author: book.author
        })

        return await newBook.save();
    }
    
    async update(book: IBook) {
        return await BookModel.update(
            {
                title: book.title,
                price: book.price,
                description: book.description,
                author: book.author
            },
            { where: { id: book.id }}
        )
    }
    
    async delete(idBook: string) {
        return await BookModel.destroy({
            where: { id: idBook }
        })
    }
}