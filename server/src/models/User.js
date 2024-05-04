import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    is_activated: {
        type: Boolean,
        default: false
    },
    activation_link: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("User", User);
