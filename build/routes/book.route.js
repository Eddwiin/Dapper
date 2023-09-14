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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const route_path_config_1 = require("../configs/route-path.config");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const is_auth_middleware_1 = __importDefault(require("../middlewares/is-auth.middleware"));
const book_validator_1 = require("../validators/book.validator");
const bookRouter = (0, express_1.Router)();
const bookController = new book_controller_1.default();
bookRouter.get(route_path_config_1.ROUTE_PATH.BOOK.ALL, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield bookController.getAll(req, res, next); }));
bookRouter.get(route_path_config_1.ROUTE_PATH.BOOK.GETBYID, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield bookController.getBookById(req, res, next); }));
bookRouter.post(route_path_config_1.ROUTE_PATH.BOOK.SAVE, [
    book_validator_1.titleValidator,
    book_validator_1.priceValidator,
    book_validator_1.descriptionValidator,
    book_validator_1.authorValidator
], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield bookController.save(req, res, next); }));
bookRouter.put(route_path_config_1.ROUTE_PATH.BOOK.UPDATE, is_auth_middleware_1.default, [
    book_validator_1.idValidator,
    book_validator_1.titleValidator,
    book_validator_1.priceValidator,
    book_validator_1.descriptionValidator,
    book_validator_1.authorValidator
], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield bookController.update(req, res, next); }));
bookRouter.delete(route_path_config_1.ROUTE_PATH.BOOK.DELETE, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield bookController.delete(req, res, next); }));
exports.default = bookRouter;
