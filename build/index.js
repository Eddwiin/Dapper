"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const env_config_1 = __importDefault(require("@dapper/configs/env.config"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const csurf_1 = __importDefault(require("csurf"));
const express_1 = __importStar(require("express"));
const express_session_1 = __importDefault(require("express-session"));
require("module-alias/register");
const mongo_db_config_1 = require("./configs/mongo-db.config");
const route_path_config_1 = require("./configs/route-path.config");
const is_auth_middleware_1 = __importDefault(require("./middlewares/is-auth.middleware"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
const SERVER_PORT = env_config_1.default.SERVER_PORT;
const app = express_1.default();
const store = new MongoDBStore({
    uri: env_config_1.default.MONGO_URI,
    collection: 'sessions'
});
const csrfProctection = csurf_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.json());
app.use(express_session_1.default({
    secret: env_config_1.default.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store
}));
if (env_config_1.default.NODE_ENV === 'production') {
    app.use(csrfProctection);
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.session.isLoggedIn;
        res.locals.csrfToken = req.csrfToken();
        next();
    });
}
app.use(route_path_config_1.ROUTE_PATH.AUTH.DEFAULT, auth_route_1.default);
app.use(route_path_config_1.ROUTE_PATH.BOOK.DEFAULT, is_auth_middleware_1.default, book_route_1.default);
void mongo_db_config_1.mongooseConnect().then(() => {
    app.listen(SERVER_PORT);
});
