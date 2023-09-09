"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("../models/book.model");
class BookService {
    getAll() {
        return book_model_1.BookModel.find();
    }
    getById(id) {
        return book_model_1.BookModel.findById(id);
    }
    update(book) {
        const options = { returnNewDocument: true };
        return book_model_1.BookModel.updateOne({ _id: book._id }, {
            $set: {
                title: book.title,
                price: book.price,
                description: book.description,
                author: book.author
            }
        }, options);
    }
    save(book) {
        const newBook = new book_model_1.BookModel({
            title: book.title,
            price: book.price,
            description: book.description,
            author: book.author
        });
        return newBook.save();
        ;
    }
    delete(id) {
        return book_model_1.BookModel.deleteOne({ _id: id });
    }
}
exports.BookService = BookService;
