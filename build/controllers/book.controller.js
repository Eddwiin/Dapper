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
const express_validator_1 = require("express-validator");
const book_service_1 = require("../services/book.service");
const errors_response_util_1 = require("../utils/errors-response.util");
class BookController {
    constructor() {
        this.bookService = new book_service_1.BookService();
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookService.getAll()
                .then((books) => res.status(200).json({ response: books }))
                .catch((err) => { (0, errors_response_util_1.handleServerError)(err, next); });
        });
    }
    getBookById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield this.bookService.getById(id)
                .then((book) => res.status(200).json({ response: book }))
                .catch((err) => { (0, errors_response_util_1.handleServerError)(err, next); });
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            try {
                if (!errors.isEmpty())
                    throw new Error('Invalid fields');
            }
            catch (error) {
                (0, errors_response_util_1.handleValidationFieldError)(error, errors.array(), next);
                return;
            }
            return yield this.bookService.update(req.body)
                .then((result) => res.status(200).json({ response: result }))
                .catch((err) => { (0, errors_response_util_1.handleServerError)(err, next); });
        });
    }
    save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            try {
                if (!errors.isEmpty())
                    throw new Error('Invalid fields');
            }
            catch (error) {
                (0, errors_response_util_1.handleValidationFieldError)(error, errors.array(), next);
                return;
            }
            return yield this.bookService.save(req.body)
                .then((result) => res.status(200).send(result))
                .catch((err) => { (0, errors_response_util_1.handleServerError)(err, next); });
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield this.bookService.delete(id)
                .then((result) => res.status(200).send(result))
                .catch((err) => { (0, errors_response_util_1.handleServerError)(err, next); });
        });
    }
}
exports.default = BookController;
