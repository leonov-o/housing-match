import mongoose from "mongoose";

const Housing = new mongoose.Schema({
    name: String,
    region: String,
    city: String,
    address: String,
    images: [String],
    price: Number,
    description: String,
    contacts: [String],
    rooms: Number,
    capacity: Number,
    tags: [Number],
    views: {
        type: Number,
        default: 0
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

export default mongoose.model("Housing", Housing);
