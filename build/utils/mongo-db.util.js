"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnect = void 0;
// import { default as connectMongoDBSession } from 'connect-mongodb-session';
const mongoose_1 = __importDefault(require("mongoose"));
const env_util_1 = __importDefault(require("./env.util"));
const MONGO_URI = env_util_1.default.MONGO_URI;
const mongooseConnect = () => {
    return mongoose_1.default.connect(MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("ERROR MONGODB: " + err));
};
exports.mongooseConnect = mongooseConnect;
// export const mongoDBStore = new connectMongoDBSession({
//     uri: MONGO_URI,
//     collection: 'sessions'
// });
