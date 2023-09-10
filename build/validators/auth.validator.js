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
exports.passwordValidator = exports.passwordRegexValidator = exports.lastNameValidator = exports.firstNameValidator = exports.emailValidator = exports.emailExistValidator = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = require("../models/user.model");
const firstNameValidator = express_validator_1.body('firstName').notEmpty().withMessage('Must not be empty')
    .isString().withMessage('Must be a string').isLength({ min: 2, max: 30 })
    .withMessage('Must be between 2 and 30 letters');
exports.firstNameValidator = firstNameValidator;
const lastNameValidator = express_validator_1.body('lastName').notEmpty().withMessage('Must not be empty')
    .isString().withMessage('Must be a string').isLength({ min: 2, max: 30 })
    .withMessage('Must be between 2 and 30 letters');
exports.lastNameValidator = lastNameValidator;
const emailValidator = express_validator_1.body('email').isEmail().withMessage('Email invalid').normalizeEmail().trim();
exports.emailValidator = emailValidator;
const emailExistValidator = express_validator_1.body('email')
    .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield new user_model_1.UserModel({ email }).findUserByEmail();
    return (userFound !== null) ? yield Promise.reject(new Error('E-mail already in use')) : null;
}));
exports.emailExistValidator = emailExistValidator;
const passwordRegexValidator = express_validator_1.body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
});
exports.passwordRegexValidator = passwordRegexValidator;
const passwordValidator = express_validator_1.body('password').notEmpty().withMessage('Must not be empty').isString().withMessage('Must be a string').trim();
exports.passwordValidator = passwordValidator;
