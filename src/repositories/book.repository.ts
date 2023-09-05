import { IBook } from "../interfaces/book.interface";
import { BookModel } from "../models/mongoose/book-schema.model";

export class BookRepository {

    getAll() {
        return BookModel.find();
    }

    getById(id: string) {
        return BookModel.findById(id);
    }

    update(book: IBook) {
        const options = { returnNewDocument: true };
        const ObjectId = require('mongoose').Types.ObjectId; 
                
        return BookModel.updateOne(
            { _id: book._id},
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

    save(book: Omit<IBook,'id'>) {
        console.log("SAVE", book);
        const newBook = new BookModel({
            title: book.title,
            price: book.price,
            description: book.description,
            author: book.author
        });
        
        return newBook.save();
    }

    delete(id: string) {
        return BookModel.deleteOne(
            { _id: id}
        )
    }
}