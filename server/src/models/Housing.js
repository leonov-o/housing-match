import mongoose from "mongoose";
import Tag from "./Tag.js";

const Housing = new mongoose.Schema({
    name: String,
    region: String,
    city: String,
    address: String,
    images: [String],
    price: Number,
    description: String,
    capacity: Number,
    tags: [Tag],
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model("Housing", Housing);
