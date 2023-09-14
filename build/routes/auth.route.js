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
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const route_path_config_1 = require("../configs/route-path.config");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
authRouter.post(route_path_config_1.ROUTE_PATH.AUTH.SIGNUP, [
    auth_validator_1.firstNameValidator,
    auth_validator_1.lastNameValidator,
    auth_validator_1.emailValidator,
    auth_validator_1.emailExistValidator,
    auth_validator_1.passwordRegexValidator
], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield authController.postSignUp(req, res, next); }));
authRouter.post(route_path_config_1.ROUTE_PATH.AUTH.SIGNIN, [
    auth_validator_1.emailValidator,
    auth_validator_1.passwordValidator
], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return yield authController.postSignIn(req, res, next); }));
authRouter.post(route_path_config_1.ROUTE_PATH.AUTH.LOGOUT, (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield authController.postLogout(req, res); }));
exports.default = authRouter;
