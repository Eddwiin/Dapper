"use strict";
// DOC: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getConfig = () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        SERVER_PORT: (process.env.SERVER_PORT != null) ? Number(process.env.SERVER_PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,
        SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY
    };
};
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const ENV_CONFIG = getSanitzedConfig(getConfig());
exports.default = ENV_CONFIG;
