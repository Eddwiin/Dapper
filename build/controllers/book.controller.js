"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const book_service_1 = require("../services/book.service");
const errors_response_util_1 = require("../utils/errors-response.util");
class BookController {
    constructor() {
        this.bookService = new book_service_1.BookService();
    }
    getAll(req, res) {
        return this.bookService.getAll()
            .then((books) => res.status(200).send(books));
    }
    getBookById(req, res) {
        const { id } = req.params;
        return this.bookService.getById(id).then((book) => res.status(200).send(book));
    }
    update(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return (0, errors_response_util_1.returnErrorsStatus)(res, errors);
        return this.bookService.update(req.body)
            .then((result) => res.status(200).send(result))
            .catch(err => console.error(err));
    }
    save(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return (0, errors_response_util_1.returnErrorsStatus)(res, errors);
        return this.bookService.save(req.body)
            .then((result) => res.status(200).send(result));
    }
    delete(req, res) {
        const { id } = req.params;
        return this.bookService.delete(id)
            .then((result) => res.status(200).send(result))
            .catch(err => console.log("ERREUR", err));
    }
}
exports.default = BookController;
