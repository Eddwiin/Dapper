"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const route_path_util_1 = require("../utils/route-path.util");
const book_validator_1 = require("../validators/book.validator");
const bookRouter = (0, express_1.Router)();
const bookController = new book_controller_1.default();
bookRouter.get(route_path_util_1.ROUTE_PATH.BOOK.ALL, (req, res) => bookController.getAll(req, res));
bookRouter.get(route_path_util_1.ROUTE_PATH.BOOK.GETBYID, (req, res) => bookController.getBookById(req, res));
bookRouter.post(route_path_util_1.ROUTE_PATH.BOOK.SAVE, [
    book_validator_1.titleValidator,
    book_validator_1.priceValidator,
    book_validator_1.descriptionValidator,
    book_validator_1.authorValidator
], (req, res) => bookController.save(req, res));
bookRouter.put(route_path_util_1.ROUTE_PATH.BOOK.UPDATE, [
    book_validator_1.idValidator,
    book_validator_1.titleValidator,
    book_validator_1.priceValidator,
    book_validator_1.descriptionValidator,
    book_validator_1.authorValidator
], (req, res) => bookController.update(req, res));
bookRouter.delete(route_path_util_1.ROUTE_PATH.BOOK.DELETE, (req, res) => bookController.delete(req, res));
exports.default = bookRouter;
