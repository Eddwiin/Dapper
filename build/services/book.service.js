"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = new book_model_1.BookModel({
                title: book.title,
                price: book.price,
                description: book.description,
                author: book.author
            });
            return yield newBook.save();
        });
    }
    delete(id) {
        return book_model_1.BookModel.deleteOne({ _id: id });
    }
}
exports.BookService = BookService;
