import { Request, Response } from "express";
import { Model } from "sequelize";
import { IBook } from "../interfaces/book.interface";
import { BookService } from "../services/book.service";

export default class BookController {
    bookService = new BookService();

    getAll(req: Request, res: Response) {
        return this.bookService.getAll()
            .then((books: Model<IBook>[]) => res.status(200).send(books))
    }

    getBookById(req: Request, res: Response) {
        const { id } = req.params;

        return this.bookService.getById(id).then((book) => res.status(200).send(book)) 
    }

    update(req: Request, res: Response) {
        return this.bookService.update(req.body)
            .then((result) => res.status(200).send(result))
    }

    save(req: Request, res: Response) {
        return this.bookService.save(req.body)
            .then((result) => res.status(200).send(result))

    }

    delete(req: Request, res: Response) {
        const { id } = req.params;

        return this.bookService.delete(id)
                .then((book) => res.status(200)) 
                .catch(err => console.log("ERREUR", err))
    }
}

