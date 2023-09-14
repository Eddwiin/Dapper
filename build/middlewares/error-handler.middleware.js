"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    return res.status(Number(err.name)).json({
        errors: err.message
    });
};
exports.errorHandler = errorHandler;
