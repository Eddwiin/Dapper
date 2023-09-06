import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { BookService } from "../services/book.service";

export default class BookController {
    bookService = new BookService();

    getAll(req: Request, res: Response) {
        return this.bookService.getAll()
            .then((books) => res.status(200).send(books))
    }

    getBookById(req: Request, res: Response) {
        const { id } = req.params;

        return this.bookService.getById(id).then((book) => res.status(200).send(book)) 
    }

    update(req: Request, res: Response) {
        const errors = validationResult(req);
        
        if (errors) return this.returnErrorsStatus(res, errors);

        return this.bookService.update(req.body)
            .then((result: any) => res.status(200).send(result))
            .catch(err => console.error(err))
    }

    save(req: Request, res: Response) {
        const errors = validationResult(req);

        if (errors) return this.returnErrorsStatus(res, errors)
        
        return this.bookService.save(req.body)
            .then((result) => res.status(200).send(result))
    }

    delete(req: Request, res: Response) {
        const { id } = req.params;

        return this.bookService.delete(id)
                .then((result) => res.status(200).send(result)) 
                .catch(err => console.log("ERREUR", err))
    }

    private returnErrorsStatus(res: Response, errors: Result<ValidationError>) {
        return res.status(422).send({
            errors: errors.array()
        })
    }
}

