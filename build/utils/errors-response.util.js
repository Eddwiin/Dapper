"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUnauthorized = exports.handleValidationFieldError = exports.handleServerError = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode["ValidationError"] = "400";
    HttpStatusCode["ServerError"] = "500";
    HttpStatusCode["NotFound"] = "404";
    HttpStatusCode["NotAuthorized"] = "401";
    HttpStatusCode["UnprocessableEntity"] = "422";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
const handleServerError = (err, next) => {
    err.name = HttpStatusCode.ServerError;
    next(err);
};
exports.handleServerError = handleServerError;
const handleValidationFieldError = (error, message, next) => {
    error.name = HttpStatusCode.UnprocessableEntity;
    error.message = message;
    next(error);
};
exports.handleValidationFieldError = handleValidationFieldError;
const handleUnauthorized = (error, next) => {
    error.name = HttpStatusCode.NotAuthorized;
    next(error);
};
exports.handleUnauthorized = handleUnauthorized;
