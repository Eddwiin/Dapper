"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleValidator = exports.priceValidator = exports.idValidator = exports.descriptionValidator = exports.authorValidator = void 0;
const express_validator_1 = require("express-validator");
const idValidator = (0, express_validator_1.body)('_id').notEmpty().withMessage('Must contains an _id');
exports.idValidator = idValidator;
const titleValidator = (0, express_validator_1.body)('title').isString().withMessage('Must be a string')
    .isLength({ min: 3, max: 15 }).withMessage('Must be between 3 and 15 letter').trim();
exports.titleValidator = titleValidator;
const priceValidator = (0, express_validator_1.body)('price').isFloat({ min: 0.00 }).withMessage('Must be a float with minimum value has 0.00').trim();
exports.priceValidator = priceValidator;
const descriptionValidator = (0, express_validator_1.body)('description').notEmpty().withMessage('Must not be empty')
    .isString().withMessage('Must be a string').isLength({ min: 10, max: 60 }).withMessage('Must be between 3 and 15 letter')
    .trim();
exports.descriptionValidator = descriptionValidator;
const authorValidator = (0, express_validator_1.body)('author').notEmpty().withMessage('Must not be empty').isString().withMessage('Must be a string')
    .not().matches(/\d/).withMessage('Must not contain numbers').trim();
exports.authorValidator = authorValidator;
