import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        methods: {
            async findUserByEmail() {
                return await mongoose.model('User').findOne({ email: this.email })
            }
        }
    }
);

const UserModel = model('User', UserSchema);

export { UserModel };
