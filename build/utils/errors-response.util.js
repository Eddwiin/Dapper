"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnErrorsStatus = void 0;
const returnErrorsStatus = (res, errors) => {
    return res.status(422).send({
        errors: errors.array()
    });
};
exports.returnErrorsStatus = returnErrorsStatus;
