"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const route_path_util_1 = require("../utils/route-path.util");
const auth_validator_1 = require("../validators/auth.validator");
const authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
authRouter.post(route_path_util_1.ROUTE_PATH.AUTH.SIGNUP, [
    auth_validator_1.firstNameValidator,
    auth_validator_1.lastNameValidator,
    auth_validator_1.emailValidator,
    auth_validator_1.emailExistValidator,
    auth_validator_1.passwordRegexValidator
], (req, res) => authController.postSignUp(req, res));
authRouter.post(route_path_util_1.ROUTE_PATH.AUTH.SIGNIN, [
    auth_validator_1.emailValidator,
    auth_validator_1.passwordValidator
], (req, res) => authController.postSignIn(req, res));
exports.default = authRouter;
