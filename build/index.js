"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const csurf_1 = __importDefault(require("csurf"));
const express_1 = __importStar(require("express"));
// import ExpressSession from 'express-session';
const express_session_1 = __importDefault(require("express-session"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const env_util_1 = __importDefault(require("./utils/env.util"));
const mongo_db_util_1 = require("./utils/mongo-db.util");
const route_path_util_1 = require("./utils/route-path.util");
// declare module "express-session" {
//   interface SessionData {
//     isLoggedIn: boolean;
//   }
// }
(0, mongo_db_util_1.mongooseConnect)();
const SERVER_PORT = env_util_1.default.SERVER_PORT;
const app = (0, express_1.default)();
const csrfProctection = (0, csurf_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, express_1.json)());
app.use((0, express_session_1.default)({
    secret: env_util_1.default.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // store: mongoDBStore
}));
// app.use(csrfProctection)
app.use(route_path_util_1.ROUTE_PATH.AUTH.DEFAULT, auth_route_1.default);
app.use(route_path_util_1.ROUTE_PATH.BOOK.DEFAULT, book_route_1.default);
app.listen(SERVER_PORT);
