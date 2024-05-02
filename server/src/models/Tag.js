import mongoose from "mongoose";

const Tag = new mongoose.Schema({
    id: Number,
    name: String
});

export default mongoose.model("Tag", Tag);
