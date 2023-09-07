import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BookService } from "../services/book.service";
import { returnErrorsStatus } from "../utils/errors-response.util";

export default class BookController {
    private bookService = new BookService();

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
        
        if (!errors.isEmpty()) return returnErrorsStatus(res, errors);

        return this.bookService.update(req.body)
            .then((result: any) => res.status(200).send(result))
            .catch(err => console.error(err))
    }

    save(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return returnErrorsStatus(res, errors)
        
        return this.bookService.save(req.body)
            .then((result) => res.status(200).send(result))
    }

    delete(req: Request, res: Response) {
        const { id } = req.params;

        return this.bookService.delete(id)
                .then((result) => res.status(200).send(result)) 
                .catch(err => console.log("ERREUR", err))
    }

}

