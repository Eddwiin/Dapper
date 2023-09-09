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
exports.AuthController = void 0;
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const auth_service_1 = require("../services/auth.service");
const errors_response_util_1 = require("../utils/errors-response.util");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    postSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return (0, errors_response_util_1.returnErrorsStatus)(res, errors);
            const { firstName, lastName, email, password } = req.body;
            const hashPassword = yield (0, bcrypt_1.hash)(password, 12);
            const userToAdd = {
                firstName,
                lastName,
                email,
                password: hashPassword
            };
            return this.authService.saveUser(userToAdd)
                .then(result => res.status(200).send(result))
                .catch(err => res.status(500).send(err));
        });
    }
    postSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return (0, errors_response_util_1.returnErrorsStatus)(res, errors);
            const { email, password: passwordFromBody } = req.body;
            const userFound = yield this.authService.getUserByEmail(email);
            if (!userFound)
                return res.status(401).send('Invalid email or password');
            const isPasswordMatch = yield (0, bcrypt_1.compare)(passwordFromBody, userFound.password);
            if (!isPasswordMatch)
                return res.status(401).send('Invalid email or password');
            // req.session.isLoggedIn = true;
            const userResToReturn = {
                _id: userFound._id,
                firstName: userFound.firstName,
                lastName: userFound.lastName,
                email: userFound.email
            };
            // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
            return res.status(200).send(userResToReturn);
        });
    }
}
exports.AuthController = AuthController;
