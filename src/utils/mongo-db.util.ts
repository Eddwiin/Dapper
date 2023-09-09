// import { default as connectMongoDBSession } from 'connect-mongodb-session';
import mongoose from "mongoose";
import ENV_CONFIG from "./env.util";

const MONGO_URI = ENV_CONFIG.MONGO_URI;

export const mongooseConnect = () => {
    return mongoose.connect(MONGO_URI)
            .then(() => console.log("MongoDB connected"))
            .catch(err => console.error("ERROR MONGODB: " + err ))
}

// export const mongoDBStore = new connectMongoDBSession({
//     uri: MONGO_URI,
//     collection: 'sessions'
// });
