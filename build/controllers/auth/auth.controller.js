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
const auth_service_1 = require("../../services/auth.service");
const errors_response_util_1 = require("../../utils/errors-response.util");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    postSignUp(req, res, next) {
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
            const { firstName, lastName, email, password } = req.body;
            const hashPassword = yield (0, bcrypt_1.hash)(password, 12);
            const userToAdd = {
                firstName,
                lastName,
                email,
                password: hashPassword
            };
            return yield this.authService.saveUser(userToAdd)
                .then(result => res.status(200).jsonp({ response: result }))
                .catch((err) => {
                err.name = errors_response_util_1.HttpStatusCode.ServerError;
                next(err);
            });
        });
    }
    postSignIn(req, res, next) {
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
            const { email, password: passwordFromBody } = req.body;
            const userFound = yield this.authService.getUserByEmail(email);
            const throwinvalidEmailOrPasswordError = new Error('Invalid email or password');
            try {
                if (userFound === null)
                    throw throwinvalidEmailOrPasswordError;
            }
            catch (error) {
                (0, errors_response_util_1.handleUnauthorized)(error, next);
                return;
            }
            const isPasswordMatch = yield (0, bcrypt_1.compare)(passwordFromBody, userFound.password);
            try {
                if (!isPasswordMatch)
                    throw throwinvalidEmailOrPasswordError;
            }
            catch (error) {
                (0, errors_response_util_1.handleUnauthorized)(error, next);
                return;
            }
            req.session.isLoggedIn = true;
            req.session.user = userFound;
            req.session.save();
            const userResToReturn = {
                _id: userFound._id,
                firstName: userFound.firstName,
                lastName: userFound.lastName,
                email: userFound.email
            };
            return res.status(200).json({ response: userResToReturn });
        });
    }
    postLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.destroy(err => {
                return (err)
                    ? res.status(500).send(err)
                    : res.send('Session is destroyed');
            });
        });
    }
}
exports.AuthController = AuthController;
