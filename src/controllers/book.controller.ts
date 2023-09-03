import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";

export default class BookController {
    bookService = new BookService();

    getBooks(req: Request, res: Response, next: NextFunction) {
        new BookService().getAll().then(books => {
            console.log("books", books);
            res.send(books);
        })
    }
}

