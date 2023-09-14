"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfTokenMiddleware = void 0;
const csrfTokenMiddleware = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
};
exports.csrfTokenMiddleware = csrfTokenMiddleware;
