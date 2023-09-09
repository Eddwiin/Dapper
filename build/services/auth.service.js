"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
class AuthService {
    saveUser(user) {
        const newUser = new user_model_1.UserModel({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
        return newUser.save();
    }
    getUserByEmail(email) {
        return new user_model_1.UserModel({ email }).findUserByEmail();
    }
}
exports.AuthService = AuthService;
