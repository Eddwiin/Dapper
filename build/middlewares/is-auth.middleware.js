"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = (req, res, next) => {
    if (req.session.isLoggedIn === false)
        return res.status(401).send('Not logged !');
    next();
};
exports.default = isAuth;
