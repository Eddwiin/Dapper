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
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
class AuthService {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.UserModel({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            });
            return yield newUser.save();
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new user_model_1.UserModel({ email }).findUserByEmail();
        });
    }
}
exports.AuthService = AuthService;
