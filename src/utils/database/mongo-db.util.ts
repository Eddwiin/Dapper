import mongoose from "mongoose";

export const mongooseConnect = () => {
    return mongoose.connect('mongodb://172.17.0.2:27017/dapper')
            .then(() => console.log("MongoDB connected"))
            .catch(err => console.error("ERROR MONGODB: " + err ))
}