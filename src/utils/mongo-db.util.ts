import mongoose from "mongoose";
import ENV_CONFIG from "./env.util";

const MONGO_URI = ENV_CONFIG.MONGO_URI;

export const mongooseConnect = () => {
    return mongoose.connect(MONGO_URI)
            .then(() => console.log("MongoDB connected"))
            .catch(err => console.error("ERROR MONGODB: " + err ))
}