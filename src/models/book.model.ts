import { Schema, model } from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const BookModel = model('Book', BookSchema);

export { BookModel };
